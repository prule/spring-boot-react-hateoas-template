package com.example.demo.common.security;

import com.example.demo.common.errorhandling.RestExceptionHandler;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.GenericFilterBean;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class JwtTokenFilter extends GenericFilterBean {

    private JwtTokenProvider jwtTokenProvider;
    private RestExceptionHandler restExceptionHandler;
    private ObjectMapper objectMapper;

    JwtTokenFilter(JwtTokenProvider jwtTokenProvider, RestExceptionHandler restExceptionHandler, ObjectMapper objectMapper) {
        this.jwtTokenProvider = jwtTokenProvider;
        this.restExceptionHandler = restExceptionHandler;
        this.objectMapper = objectMapper;
    }

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain filterChain) throws IOException, ServletException {
        String token = jwtTokenProvider.resolveToken((HttpServletRequest) request);

        try {
            if (token != null && jwtTokenProvider.validateToken(token)) {
                Authentication auth = jwtTokenProvider.getAuthentication(token);
                SecurityContextHolder.getContext().setAuthentication(auth);
            }
        }
        catch (InvalidAuthenticationTokenException e) {
            final ResponseEntity<Object> responseEntity = restExceptionHandler.handleInvalidAuthenticationToken(e, null);
            final HttpServletResponse httpServletResponse = (HttpServletResponse) response;
            httpServletResponse.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            httpServletResponse.getWriter().write(objectMapper.writeValueAsString(responseEntity));
            return;
        }

        filterChain.doFilter(request, response);
    }
}