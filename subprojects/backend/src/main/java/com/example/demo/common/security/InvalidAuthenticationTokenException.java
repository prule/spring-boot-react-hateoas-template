package com.example.demo.common.security;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.UNAUTHORIZED)
public class InvalidAuthenticationTokenException extends RuntimeException {

    InvalidAuthenticationTokenException(String message) {
        super(message);
    }

}
