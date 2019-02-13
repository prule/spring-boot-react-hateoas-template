package com.example.demo.steps;

import com.example.demo.common.security.JwtTokenProvider;
import com.example.demo.user.AuthenticateResource;
import io.restassured.response.Response;
import org.json.JSONObject;
import org.springframework.stereotype.Component;

import static io.restassured.RestAssured.given;

@Component
public class LoginSteps {

    private String authToken;

    public void login(String username, String password) throws Exception {

        JSONObject body = new JSONObject()
                .put("username", username)
                .put("password", password);

        Response response = given()
                .contentType("application/json")
                .body(body.toString())
                .when()
                .post("/api/1/login");

        AuthenticateResource s = response.body().as(AuthenticateResource.class);
        System.out.println(s.getToken());

        this.authToken = s.getToken();

    }

    public String authToken() {
        return JwtTokenProvider.BEAR_TOKEN_PREFIX + authToken;
    }
}
