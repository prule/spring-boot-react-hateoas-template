package com.example.demo.rest;

import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.restassured.RestAssured;
import io.restassured.config.DecoderConfig;
import io.restassured.config.EncoderConfig;
import io.restassured.config.ObjectMapperConfig;
import io.restassured.config.RestAssuredConfig;
import io.restassured.mapper.factory.Jackson2ObjectMapperFactory;
import org.springframework.stereotype.Component;

import java.lang.reflect.Type;

@Component
public class RestProvider {

    public void init(String baseURI, int port) {
        RestAssured.baseURI = baseURI;
        RestAssured.port = port;

        RestAssured.config = new RestAssuredConfig()
                .decoderConfig(new DecoderConfig("UTF-8"))
                .encoderConfig(new EncoderConfig("UTF-8", "UTF-8"))
                .objectMapperConfig(ObjectMapperConfig.objectMapperConfig().jackson2ObjectMapperFactory(new Jackson2ObjectMapperFactory() {

                            @Override
                            public ObjectMapper create(Type type, String s) {
                                ObjectMapper mapper = new ObjectMapper();
                                mapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
                                return mapper;
                            }
                        })
                );

    }
}
