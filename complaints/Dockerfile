FROM openjdk:17
WORKDIR /app
EXPOSE 8083
COPY target/complaints-0.0.1.jar complaints.jar
ENTRYPOINT ["java", "-jar", "complaints.jar"]