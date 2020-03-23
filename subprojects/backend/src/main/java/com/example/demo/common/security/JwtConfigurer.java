package com.example.demo.common.security;

import com.example.demo.common.errorhandling.RestExceptionHandler;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.security.config.annotation.SecurityConfigurerAdapter;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.DefaultSecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

public class JwtConfigurer extends SecurityConfigurerAdapter<DefaultSecurityFilterChain, HttpSecurity> {

    private JwtTokenProvider jwtTokenProvider;
    private RestExceptionHandler restExceptionHandler;
    private ObjectMapper objectMapper;

    JwtConfigurer(JwtTokenProvider jwtTokenProvider, RestExceptionHandler restExceptionHandler, ObjectMapper objectMapper) {
        this.jwtTokenProvider = jwtTokenProvider;
        this.restExceptionHandler = restExceptionHandler;
        this.objectMapper = objectMapper;
    }

    @Override
    public void configure(HttpSecurity http) {
        JwtTokenFilter customFilter = new JwtTokenFilter(jwtTokenProvider, restExceptionHandler, objectMapper);
        http.addFilterBefore(customFilter, UsernamePasswordAuthenticationFilter.class);
    }
}