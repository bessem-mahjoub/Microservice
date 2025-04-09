package com.document.config;

import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenAPI {
    @Bean
    public io.swagger.v3.oas.models.OpenAPI springShopOpenAPI(){
        return new io.swagger.v3.oas.models.OpenAPI().info(infoAPI());
    }
    public Info infoAPI(){
        return new Info().title("\uD83C\uDFBF Revision \uD83D\uDEA0")
                .description("Revision")
                .contact(contactAPI());
    }
    public Contact contactAPI(){
        return new Contact().name("Omar ABIDI");
    }
}