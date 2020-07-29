package com.example.demo.rest;

import com.fasterxml.jackson.databind.ObjectMapper;
import io.restassured.RestAssured;
import io.restassured.config.DecoderConfig;
import io.restassured.config.EncoderConfig;
import io.restassured.config.ObjectMapperConfig;
import io.restassured.config.RestAssuredConfig;
import io.restassured.mapper.factory.Jackson2ObjectMapperFactory;
import org.springframework.stereotype.Component;

import javax.inject.Inject;
import java.lang.reflect.Type;

@Component
public class RestProvider {

    @Inject private ObjectMapper objectMapper; // spring boot object mapper so that our tests use the same serialization/deserialization as the application

    public void init(String baseURI, int port) {
        RestAssured.baseURI = baseURI;
        RestAssured.port = port;

        RestAssured.config = new RestAssuredConfig()
            .decoderConfig(new DecoderConfig("UTF-8"))
            .encoderConfig(new EncoderConfig("UTF-8", "UTF-8"))
            .objectMapperConfig(ObjectMapperConfig.objectMapperConfig().jackson2ObjectMapperFactory(new Jackson2ObjectMapperFactory() {
                    @Override
                    public ObjectMapper create(Type type, String s) {
                        return objectMapper;
                    }
                })
            );
    }
}
