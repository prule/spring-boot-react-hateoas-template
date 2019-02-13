package com.example.demo.user;

import lombok.Getter;
import lombok.Setter;
import org.springframework.hateoas.ResourceSupport;

@Getter @Setter
public class AuthenticateResource extends ResourceSupport {

    private String username;
    private String password;
    private String token;

    public AuthenticateResource() {
    }

    AuthenticateResource(String username, String token) {
        this.username = username;
        this.token = token;
    }
}
