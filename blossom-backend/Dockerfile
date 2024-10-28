# 使用 Maven 官方镜像作为构建阶段，指定 Maven 版本为 3.8.6，JDK 版本为 OpenJDK 8
FROM maven:3.8.6-openjdk-8 AS builder

# 设置工作目录为 /app
WORKDIR /app

# 将项目的 pom.xml 文件复制到容器中，pom.xml 是 Maven 项目的配置文件
#COPY pom.xml .

# 将项目的所有源代码复制到容器中的当前工作目录 /app 下
COPY ./ ./
# 创建 settings.xml 文件
COPY settings.xml /root/.m2/settings.xml

# 使用 Maven 进行项目构建，执行 clean 和 package 命令，跳过测试用例的执行 (-DskipTests)
RUN mvn -X clean package -DskipTests

# 第二阶段：使用 Eclipse Temurin 的 JRE 运行环境（JDK 8），用于运行 Java 应用程序
FROM eclipse-temurin:8-jre

# 设置维护者信息，标明镜像的创建者
#MAINTAINER li-guohao <git@liguohao.cn>

# 设置工作目录为 /app
WORKDIR /app

# 从构建阶段复制打包好的 jar 文件到当前工作目录下，并重命名为 application.jar
COPY --from=builder /app/backend/target/*.jar application.jar

# 使用 Spring Boot 提供的 JarLauncher 来解压和运行 jar 文件，使用 layertools 模式
RUN java -Djarmode=layertools -jar application.jar extract

# 复制解压后的依赖文件到当前目录的 dependencies 文件夹
COPY --from=builder /app/application/dependencies/ ./dependencies/

# 复制解压后的 Spring Boot 加载器文件到当前目录的 spring-boot-loader 文件夹
COPY --from=builder /app/application/spring-boot-loader/ ./spring-boot-loader/

# 复制解压后的快照依赖文件到当前目录的 snapshot-dependencies 文件夹
COPY --from=builder /app/application/snapshot-dependencies/ ./snapshot-dependencies/

# 复制解压后的应用程序文件到当前目录的 application 文件夹
COPY --from=builder /app/application/application/ ./application/

# 设置环境变量：
# JVM_OPTS：JVM 启动参数，设置最大堆内存为 256MB，最小堆内存为 256MB
# BLOSSOM_WORK_DIR：应用程序的工作目录
# SPRING_CONFIG_LOCATION：Spring 配置文件的加载路径，优先从 classpath 和文件系统中加载
# TZ：设置时区为 Asia/Shanghai
ENV JVM_OPTS="-Xmx256m -Xms256m" \
    BLOSSOM_WORK_DIR="/home/bl" \
    SPRING_CONFIG_LOCATION="optional:classpath:/;optional:classpath:/config/;optional:file:/home/bl/" \
    TZ=Asia/Shanghai

# 设置时区：
# 创建 /etc/localtime 的符号链接，指向指定时区的时间信息文件
# 将时区信息写入 /etc/timezone 文件
RUN ln -sf /usr/share/zoneinfo/$TZ /etc/localtime \
    && echo $TZ > /etc/timezone

# 暴露 9999 端口，供外部访问应用程序
EXPOSE 80

# 设置容器的入口点，使用 sh 执行命令：
# 启动 Spring Boot 应用程序，使用指定的 JVM 启动参数和 JarLauncher 启动 application.jar
ENTRYPOINT ["sh", "-c", "java ${JVM_OPTS} org.springframework.boot.loader.JarLauncher application.jar"]