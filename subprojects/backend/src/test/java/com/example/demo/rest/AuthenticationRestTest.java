package com.example.demo.rest;

import com.example.demo.steps.LoginSteps;
import io.restassured.response.Response;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.web.server.LocalServerPort;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit4.SpringRunner;

import javax.inject.Inject;

import static io.restassured.RestAssured.given;
import static org.hamcrest.Matchers.equalTo;

@RunWith(SpringRunner.class)
@ActiveProfiles({"dev", "db-test", "db-init"})
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class AuthenticationRestTest {

    @LocalServerPort
    int port;

    @Inject private LoginSteps loginSteps;
    @Inject private RestProvider restProvider;

    @Before
    public void setup() throws Exception {
        restProvider.init("http://localhost", port);
    }

    @Test
    public void should_return_403() {
        Response response =
                given()
                        .get("/api/1/persons/{key}", "unknown");

        response
                .then()
                .body("status", equalTo(403))
                .body("error", equalTo("Forbidden"))
                .and()
                .statusCode(403);
    }
}
