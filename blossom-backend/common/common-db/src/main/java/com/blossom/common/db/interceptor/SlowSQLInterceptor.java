package com.blossom.common.db.interceptor;

import cn.hutool.core.util.StrUtil;
import com.github.pagehelper.util.StringUtil;
import com.blossom.common.db.DBProperties;
import lombok.extern.slf4j.Slf4j;
import org.apache.ibatis.cache.CacheKey;
import org.apache.ibatis.executor.Executor;
import org.apache.ibatis.mapping.BoundSql;
import org.apache.ibatis.mapping.MappedStatement;
import org.apache.ibatis.mapping.ParameterMapping;
import org.apache.ibatis.mapping.ParameterMode;
import org.apache.ibatis.plugin.*;
import org.apache.ibatis.reflection.MetaObject;
import org.apache.ibatis.session.Configuration;
import org.apache.ibatis.session.ResultHandler;
import org.apache.ibatis.session.RowBounds;
import org.apache.ibatis.type.TypeHandlerRegistry;
import org.springframework.stereotype.Component;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 * 慢 sql 拦截
 *
 * @author xzzz
 */
@Slf4j
@Component
@Intercepts({
        @Signature(type = Executor.class, method = "update", args = {MappedStatement.class, Object.class}),
        @Signature(type = Executor.class, method = "query", args = {MappedStatement.class, Object.class, RowBounds.class, ResultHandler.class}),
        @Signature(type = Executor.class, method = "query", args = {MappedStatement.class, Object.class, RowBounds.class, ResultHandler.class, CacheKey.class, BoundSql.class}),
})
public class SlowSQLInterceptor implements Interceptor {

    private static final ThreadLocal<SimpleDateFormat> DATETIME_FORMATTER = ThreadLocal
            .withInitial(() -> new SimpleDateFormat("yyyy-MM-dd HH:mm:ss"));

    private final Long slowInterval;

    public SlowSQLInterceptor(DBProperties dbProperties) {
        if (dbProperties == null) {
            this.slowInterval = 1000L;
        } else {
            this.slowInterval = dbProperties.getSlowInterval();
        }
        log.info("[    BASE] 慢查询时长为 : {}ms", slowInterval);
    }

    @Override
    public Object intercept(Invocation invocation) throws Throwable {
        long start = System.currentTimeMillis();
        try {
            return invocation.proceed();
        } finally {
            long ms = System.currentTimeMillis() - start;
            if (ms >= slowInterval) {
                MappedStatement mappedStatement = (MappedStatement) invocation.getArgs()[0];
                Object parameter = null;
                if (invocation.getArgs().length > 1) {
                    parameter = invocation.getArgs()[1];
                }
                BoundSql boundSql = mappedStatement.getBoundSql(parameter);
                Configuration configuration = mappedStatement.getConfiguration();
                String sql = this.getSql(configuration, boundSql);
                log.error("SLOW_SQL >> [{}ms] {}", StrUtil.fillBefore(String.valueOf(ms), ' ', 4), sql);
            }
        }
    }

    /**
     * 获取完整的sql语句
     *
     * @param configuration
     * @param boundSql
     * @return
     */
    private String getSql(Configuration configuration, BoundSql boundSql) {
        // 输入sql字符串空判断
        String sql = boundSql.getSql();
        if (StringUtil.isEmpty(sql)) {
            return "";
        }
        return formatSql(sql, configuration, boundSql);
    }

    /**
     * 将占位符替换成参数值
     *
     * @param sql
     * @param configuration
     * @param boundSql
     * @return
     */
    private String formatSql(String sql, Configuration configuration, BoundSql boundSql) {
        //美化sql
        sql = clearSql(sql);
        //填充占位符, 目前基本不用mybatis存储过程调用,故此处不做考虑
        Object parameterObject = boundSql.getParameterObject();
        List<ParameterMapping> parameterMappings = boundSql.getParameterMappings();
        TypeHandlerRegistry typeHandlerRegistry = configuration.getTypeHandlerRegistry();
        List<String> parameters = new ArrayList<>();
        if (parameterMappings != null) {
            MetaObject metaObject = parameterObject == null ? null : configuration.newMetaObject(parameterObject);
            for (ParameterMapping parameterMapping : parameterMappings) {
                if (parameterMapping.getMode() != ParameterMode.OUT) {
                    //  参数值
                    Object value;
                    String propertyName = parameterMapping.getProperty();
                    //  获取参数名称
                    if (boundSql.hasAdditionalParameter(propertyName)) {
                        // 获取参数值
                        value = boundSql.getAdditionalParameter(propertyName);
                    } else if (parameterObject == null) {
                        value = null;
                    } else if (typeHandlerRegistry.hasTypeHandler(parameterObject.getClass())) {
                        // 如果是单个值则直接赋值
                        value = parameterObject;
                    } else {
                        value = metaObject == null ? null : metaObject.getValue(propertyName);
                    }

                    if (value instanceof Number) {
                        parameters.add(String.valueOf(value));
                    } else {
                        StringBuilder builder = new StringBuilder();
                        builder.append("'");
                        if (value instanceof Date) {
                            builder.append(DATETIME_FORMATTER.get().format((Date) value));
                        } else if (value instanceof String) {
                            builder.append(value);
                        }
                        builder.append("'");
                        parameters.add(builder.toString());
                    }
                }
            }
        }

        // for (String value : parameters) {
        //     if (value.length() > 500) {
        //         sql = sql.replaceFirst("\\?", "!!该参数超长,已忽略!!");
        //     } else {
        //         sql = sql.replaceFirst("\\?", value);
        //     }
        //
        // }
        return sql;
    }

    public static String clearSql(String sql) {
        sql = sql.replaceAll("[\\s\n ]+", " ");
        sql = sql.replace(" = ", "=");
        return sql;
    }


    @Override
    public Object plugin(Object target) {
        if (target instanceof Executor) {
            return Plugin.wrap(target, this);
        }
        return target;
    }
}
