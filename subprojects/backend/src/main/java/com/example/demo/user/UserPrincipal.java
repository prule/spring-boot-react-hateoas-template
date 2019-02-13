package com.example.demo.user;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Collections;

public class UserPrincipal implements UserDetails {

    private String password;
    private String username;
    private boolean enabled;

    public UserPrincipal(User user) {
        this.password = user.getPassword();
        this.username = user.getUsername();
        this.enabled = user.isEnabled();
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {

        // TODO implement roles
        return Collections.emptyList();

    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return username;
    }

    @Override
    public boolean isAccountNonExpired() {
        // TODO implement account expired
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        // TODO implement account locked
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        // TODO implement credential expiry
        return true;
    }

    @Override
    public boolean isEnabled() {
        return enabled;
    }
}
