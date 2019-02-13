package com.example.demo;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.web.server.ErrorPage;
import org.springframework.boot.web.server.WebServerFactoryCustomizer;
import org.springframework.boot.web.servlet.server.ConfigurableServletWebServerFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.web.config.EnableSpringDataWebSupport;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@EnableSpringDataWebSupport
class WebConfiguration implements WebMvcConfigurer {

    @Value("${app.cors.origins:}") String[] corsOrigins;

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        if (corsOrigins != null && corsOrigins.length > 0) {
            registry.addMapping("/**")
                    .allowCredentials(true)
                    .allowedOrigins(corsOrigins)
                    .allowedMethods(
                            HttpMethod.OPTIONS.name(),
                            HttpMethod.HEAD.name(),
                            HttpMethod.GET.name(),
                            HttpMethod.POST.name(),
                            HttpMethod.PUT.name(),
                            HttpMethod.DELETE.name());
        }
        WebMvcConfigurer.super.addCorsMappings(registry);
    }

    // Configure 404 to serve the SPA

    @Override
    public void addViewControllers(ViewControllerRegistry registry) {
        registry.addViewController("/notFound").setViewName("forward:/index.html");
    }

    @Bean
    public WebServerFactoryCustomizer<ConfigurableServletWebServerFactory> containerCustomizer() {
        return container -> container.addErrorPages(new ErrorPage(HttpStatus.NOT_FOUND, "/notFound"));
    }

}