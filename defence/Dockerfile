FROM openjdk:17
WORKDIR /app
EXPOSE 8087
COPY target/defence-0.0.1.jar defence.jar
ENTRYPOINT ["java", "-jar", "defence.jar"]