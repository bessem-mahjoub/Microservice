package com.companies.gateway;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
@EnableDiscoveryClient
public class GatewayApplication {

    public static void main(String[] args) {
        SpringApplication.run(GatewayApplication.class, args);
    }

    @Bean
    public RouteLocator gatewayRoutes(RouteLocatorBuilder builder) {
        return builder.routes()
                .route("task-service", r -> r
                        .path("/api/tasks/**")
                        .uri("http://localhost:8081"))
                .route("company", r -> r
                        .path("/api/company/**")
                        .uri("http://localhost:8082"))
                .route("company", r -> r
                        .path("/api/offers/**")
                        .uri("http://localhost:8082"))
                .route("offers", r -> r
                        .path("/api/offer/**")
                        .uri("http://localhost:8082"))
                .route("complaint", r -> r
                        .path("/api/complaint/**")
                        .uri("http://localhost:8083"))
                .route("documents", r -> r
                        .path("/api/documents/**")
                        .uri("http://localhost:8084"))
                .route("documents", r -> r
                        .path("/api/text-analysis/**")
                        .uri("http://localhost:8084"))
                .route("internship", r -> r
                        .path("/api/internships/**")
                        .uri("http://localhost:8086"))
                .route("defences", r -> r
                        .path("/api/defences/**")
                        .uri("http://localhost:8087"))
                .route("defences", r -> r
                        .path("/api/**")
                        .uri("http://localhost:8081"))
                .build();
    }
}
