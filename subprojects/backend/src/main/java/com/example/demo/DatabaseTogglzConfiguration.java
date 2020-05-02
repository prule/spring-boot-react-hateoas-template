package com.example.demo;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.togglz.core.Feature;
import org.togglz.core.manager.TogglzConfig;
import org.togglz.core.repository.StateRepository;
import org.togglz.core.repository.jdbc.JDBCStateRepository;
import org.togglz.core.user.UserProvider;
import org.togglz.spring.security.SpringSecurityUserProvider;

import javax.sql.DataSource;

@RequiredArgsConstructor
@Component
public class DatabaseTogglzConfiguration implements TogglzConfig {

    private final DataSource dataSource;

    @Override
    public StateRepository getStateRepository() {
        return new JDBCStateRepository(dataSource);
    }

    @Override
    public Class<? extends Feature> getFeatureClass() {
        return null;
    }

    @Override
    public UserProvider getUserProvider() {
        return new SpringSecurityUserProvider("ROLE_ADMIN");
    }

}