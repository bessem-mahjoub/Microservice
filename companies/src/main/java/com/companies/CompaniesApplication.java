package com.companies;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@EnableDiscoveryClient
@ComponentScan(basePackages = {
        "com.companies.Controller",
        "com.companies.Services",
        "com.companies.Repositories"
})
public class CompaniesApplication {

    public static void main(String[] args) {
        SpringApplication.run(CompaniesApplication.class, args);
    }

    /*
    spring.application.name=companies
spring.data.mongodb.host=localhost
spring.data.mongodb.port=27017
spring.data.mongodb.database=micro
server.port=8082
eureka.client.service-url.defaultZone=http://eureka:8761/eureka/
eureka.client.register-with-eureka=true
eureka.client.fetch-registry=true
management.endpoints.web.exposure.include=*
spring.cloud.compatibility-verifier.enabled=false
logging.level.org.springframework.messaging=trace
logging.level.org.springframework.web.socket=trace
logging.level.org.springframework.cloud.gateway=DEBUG
logging.level.org.springframework.web=DEBUG
     */
}
