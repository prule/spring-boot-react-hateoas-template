package com.example.demo.pet;

import com.example.demo.common.Key;
import com.example.demo.common.security.JwtTokenProvider;
import com.example.demo.rest.RestProvider;
import com.example.demo.steps.LoginSteps;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.web.server.LocalServerPort;
import org.springframework.test.context.ActiveProfiles;

import javax.inject.Inject;

import static io.restassured.RestAssured.given;
import static io.restassured.RestAssured.with;
import static org.hamcrest.Matchers.equalTo;
import static org.hamcrest.Matchers.greaterThan;

@ActiveProfiles({"dev", "db-test", "db-init"})
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class PetApiRestTest {

    @LocalServerPort
    int port;

    @Inject private LoginSteps loginSteps;
    @Inject private RestProvider restProvider;

    @BeforeEach
    public void setup() throws Exception {
        restProvider.init("http://localhost", port);
        loginSteps.login("bob", "password");
    }

    @Test
    public void should_find_pet() {
        given()
                .header(JwtTokenProvider.AUTH_HEADER, loginSteps.authToken())
                .when()
                .get("/api/1/pets/{key}", "fido")
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
                .header(JwtTokenProvider.AUTH_HEADER, loginSteps.authToken())
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
                .header(JwtTokenProvider.AUTH_HEADER, loginSteps.authToken())
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
                .header(JwtTokenProvider.AUTH_HEADER, loginSteps.authToken())
                .get("/api/1/pets")
                .then()
                .statusCode(200)
                .body("page.totalElements", greaterThan(4))
        ;
    }

}
