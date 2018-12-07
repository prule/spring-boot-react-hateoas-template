package com.example.demo.pet;

import com.example.demo.common.Key;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.restassured.RestAssured;
import io.restassured.config.DecoderConfig;
import io.restassured.config.EncoderConfig;
import io.restassured.config.ObjectMapperConfig;
import io.restassured.config.RestAssuredConfig;
import io.restassured.mapper.factory.Jackson2ObjectMapperFactory;
import org.junit.Before;
import org.junit.FixMethodOrder;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.MethodSorters;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.web.server.LocalServerPort;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit4.SpringRunner;

import java.lang.reflect.Type;

import static io.restassured.RestAssured.get;
import static io.restassured.RestAssured.with;
import static org.hamcrest.Matchers.equalTo;
import static org.hamcrest.Matchers.greaterThan;

@RunWith(SpringRunner.class)
@ActiveProfiles({"dev", "db-test", "db-init"})
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@FixMethodOrder(MethodSorters.NAME_ASCENDING)
public class PetApiRestTest {

    @LocalServerPort
    int port;

    @Before
    public void setup() {
        RestAssured.baseURI = "http://localhost";
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

    @Test
    public void should_find_pet() {
        get("/api/1/pets/{key}", "fido")
                .then()
                .statusCode(200)
                .body("key", equalTo("fido"))
                .body("name.name", equalTo("Fido"));
    }

    @Test
    public void should_update_pet() {

        Key key = new Key("fido");

        // change name
        Pet pet = new Pet(key, new PetName("KUJO"));
        PetResource resource = new PetResource().fromModel(pet);

        with()
                .body(resource)
                .contentType("application/json")
                .put("/api/1/pets/{key}", key.getKey())
                .then()
                .statusCode(200)
                .body("key", equalTo("fido"))
                .body("name.name", equalTo("KUJO"))
        ;
    }

    @Test
    public void should_search_pets_by_person() {

        with()
                .contentType("application/json")
                .get("/api/1/pets?personKey=john-doe")
                .then()
                .statusCode(200)
                .body("page.totalElements", equalTo(2))
        ;
    }

    @Test
    public void should_return_all_pets() {

        with()
                .contentType("application/json")
                .get("/api/1/pets")
                .then()
                .statusCode(200)
                .body("page.totalElements", greaterThan(4))
        ;
    }

}
