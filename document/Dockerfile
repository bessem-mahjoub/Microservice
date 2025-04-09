FROM openjdk:17
WORKDIR /app
EXPOSE 8084
COPY target/document-0.0.1.jar document.jar
ENTRYPOINT ["java", "-jar", "document.jar"]