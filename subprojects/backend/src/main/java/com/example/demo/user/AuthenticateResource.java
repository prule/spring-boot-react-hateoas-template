package com.example.demo.user;

import lombok.Getter;
import lombok.Setter;
import org.springframework.hateoas.RepresentationModel;

@Getter @Setter
public class AuthenticateResource extends RepresentationModel<AuthenticateResource> {

    private String username;
    private String password;
    private String token;

    private UserResource user;

    public AuthenticateResource() {
    }

    AuthenticateResource(String username, String token, User user) {
        this.username = username;
        this.token = token;
        this.user = new UserResource().fromModel(user);
    }
}
