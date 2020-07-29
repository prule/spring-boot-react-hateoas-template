package com.example.demo.person;

import com.example.demo.common.Key;
import com.example.demo.common.security.JwtTokenProvider;
import com.example.demo.steps.LoginSteps;
import com.example.demo.support.QueryParams;
import com.example.demo.support.SearchResult;
import io.restassured.response.Response;
import io.restassured.response.ValidatableResponse;
import org.springframework.hateoas.Link;
import org.springframework.hateoas.PagedModel;
import org.springframework.stereotype.Component;

import javax.inject.Inject;
import java.util.List;
import java.util.Map;

import static io.restassured.RestAssured.given;
import static io.restassured.RestAssured.with;

@Component
public class PersonSteps {

    @Inject private LoginSteps loginSteps;

    public PersonResource get(Key key) {

        return given()
            .header(JwtTokenProvider.AUTH_HEADER, loginSteps.authToken())
            .when()
            .get("/api/1/persons/{key}", key.getKey())
            .then()
            .statusCode(200)
            .extract().as(PersonResource.class);

    }

    public PersonResource update(PersonResource resource) {

        return with()
            .body(resource)
            .header(JwtTokenProvider.AUTH_HEADER, loginSteps.authToken())
            .contentType("application/json")
            .put("/api/1/persons/{key}", resource.getKey())
            .then()
            .statusCode(200)
            .extract().as(PersonResource.class);

    }

    public SearchResult<PersonResource> search(PersonSearchCriteria criteria) {

        final Map<String, ?> queryParams = new QueryParams(criteria).asMap();

        final Response response = with()
            .contentType("application/json")
            .header(JwtTokenProvider.AUTH_HEADER, loginSteps.authToken())
            .given()
            .queryParams(queryParams)
            .when()
            .get("/api/1/persons");

        final ValidatableResponse result = response
            .then()
            .statusCode(200);

        final List<PersonResource> content = response.then().extract().body().jsonPath().getList("_embedded.personResourceList", PersonResource.class);
        SearchResult<PersonResource> searchResult = result.extract().as(SearchResult.class);
        searchResult.setContent(content);

//        final PagedModel<PersonResource> pagedModel = result.extract().<PagedModel<PersonResource>>as(PagedModel.class);
//        final List<Link> links = response.then().extract().body().jsonPath().getList("_links", Link.class);

//        return new PagedModel<>(content, pagedModel.getMetadata(), links);

        return searchResult;
    }
}
