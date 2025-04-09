FROM openjdk:17
EXPOSE 8224
ADD target/gateway-0.0.1.jar gateway.jar
ENTRYPOINT ["java", "-jar", "/gateway.jar"]