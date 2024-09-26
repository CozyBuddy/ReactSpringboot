package com.zerock.mallapi.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.format.FormatterRegistry;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import com.zerock.mallapi.controller.formatter.LocalDateFormatter;

@Configuration
public class CustomServletConfig implements WebMvcConfigurer{
    
    public void addFormatters(FormatterRegistry registry){
        registry.addFormatter(new LocalDateFormatter());
    }

    // public void addCorsMappings(CorsRegistry registry){
    //     registry.addMapping("/**")
    //     .allowedOrigins("*")
    //     .allowedMethods("HEAD","GET" ,"POST" ,"PUT" , "DELETE" ,"OPTIONS")
    //     .maxAge(300)
    //     .allowedHeaders("Authorization" , "Cache-Control" , "Content-type");
    // }
}
