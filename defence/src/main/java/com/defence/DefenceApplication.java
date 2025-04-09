package com.defence;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

@SpringBootApplication
@EnableDiscoveryClient
public class DefenceApplication {

    public static void main(String[] args) {
        SpringApplication.run(DefenceApplication.class, args);
    }

}
