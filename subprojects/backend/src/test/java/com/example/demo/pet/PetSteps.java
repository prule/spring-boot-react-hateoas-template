package com.example.demo.pet;

import com.example.demo.common.Key;
import com.example.demo.common.security.JwtTokenProvider;
import com.example.demo.person.PersonResource;
import com.example.demo.person.PersonSearchCriteria;
import com.example.demo.steps.LoginSteps;
import com.example.demo.support.QueryParams;
import org.springframework.hateoas.PagedModel;
import org.springframework.stereotype.Component;

import javax.inject.Inject;

import java.util.Map;

import static io.restassured.RestAssured.given;
import static io.restassured.RestAssured.with;

@Component
public class PetSteps {

    @Inject private LoginSteps loginSteps;

    public PetResource get(Key key) {

        return given()
            .header(JwtTokenProvider.AUTH_HEADER, loginSteps.authToken())
            .when()
            .get("/api/1/pets/{key}", key.getKey())
            .then()
            .statusCode(200)
            .extract().as(PetResource.class);

    }


    public PetResource update(PetResource resource) {

        return with()
            .body(resource)
            .header(JwtTokenProvider.AUTH_HEADER, loginSteps.authToken())
            .contentType("application/json")
            .put("/api/1/pets/{key}", resource.getKey())
            .then()
            .statusCode(200)
            .extract().as(PetResource.class);

    }


    public PagedModel<PetResource> search(PetSearchCriteria criteria) {

        final Map<String, ?> queryParams = new QueryParams(criteria).asMap();

        return with()
            .contentType("application/json")
            .header(JwtTokenProvider.AUTH_HEADER, loginSteps.authToken())
            .given()
            .queryParams(queryParams)
            .when()
            .get("/api/1/pets")
            .then()
            .statusCode(200)
            .extract().<PagedModel<PetResource>>as(PagedModel.class)
            ;

    }
}
