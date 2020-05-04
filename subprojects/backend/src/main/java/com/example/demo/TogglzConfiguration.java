package com.example.demo;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.togglz.core.manager.FeatureManager;
import org.togglz.core.manager.FeatureManagerBuilder;
import org.togglz.core.repository.StateRepository;
import org.togglz.core.repository.jdbc.JDBCStateRepository;
import org.togglz.core.spi.FeatureManagerProvider;
import org.togglz.core.user.UserProvider;
import org.togglz.spring.security.SpringSecurityUserProvider;

import javax.sql.DataSource;

@Configuration
public class TogglzConfiguration {

    @Bean
    public StateRepository stateRepository(DataSource dataSource) {
        return JDBCStateRepository.newBuilder(dataSource)
            .createTable(true)
            .build();
    }

    @Bean
    public FeatureManagerProvider featureManagerProvider(StateRepository stateRepository, UserProvider userProvider) {
        return new FeatureManagerProvider() {

            private final FeatureManager featureManager = new FeatureManagerBuilder()
                .stateRepository(stateRepository)
                .featureEnum(Features.class)
                .userProvider(userProvider)
                .build();

            @Override
            public FeatureManager getFeatureManager() {
                return featureManager;
            }

            @Override
            public int priority() {
                return 30;
            }
        };
    }

    @Bean
    public UserProvider userProvider() {
        return new SpringSecurityUserProvider("ROLE_ADMIN");
    }

}