package com.blossom.backend;

import com.blossom.backend.config.PropertiesCheckListener;
import com.blossom.common.base.BaseConstants;
import com.blossom.common.base.util.DateUtils;
import com.blossom.expand.tracker.core.Tracker;
import com.blossom.expand.tracker.core.common.TrackerConstants;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.ApplicationRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.annotation.EnableScheduling;

import java.net.InetAddress;
import java.net.UnknownHostException;

/**
 * BLOSSOM
 *
 * @author xzzz
 */
@EnableAsync
@EnableScheduling
@SpringBootApplication
@Slf4j
public class APP {


    public static void main(String[] args) throws UnknownHostException {
        Tracker.start("APPLICATION_START", TrackerConstants.SPAN_TYPE_APPLICATION_RUN);
        SpringApplication app = new SpringApplication(APP.class);
        app.addListeners(new PropertiesCheckListener());
        ConfigurableApplicationContext applicationContext  = app.run(args);

        String ip = InetAddress.getLocalHost().getHostAddress();
        String port = applicationContext .getEnvironment().getProperty("server.port", "8080"); // 默认端口为8080

        log.info("启动完成" +
                "\n=========================================================================" +
                "\n启动成功 [" + DateUtils.now() + "], 可使用客户端登录, 默认用户名/密码: blos/blos" +
                "\n下载地址: https://github.com/blossom-editor/blossom/releases" +
                "\n文档地址: https://www.wangyunf.com/blossom-doc/index" +
                "\n博客端访问地址: http://" + ip + ":" + port + "/blog/#/home" +
                "\n客户端访问地址: http://" + ip + ":" + port + "/editor/#/settingindex" +
                "\n=========================================================================");

        Tracker.end();
    }

}
