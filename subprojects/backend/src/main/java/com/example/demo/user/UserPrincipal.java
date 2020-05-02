package com.example.demo.user;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Collections;
import java.util.Set;
import java.util.stream.Collectors;

public class UserPrincipal implements UserDetails {

    private final String password;
    private final String username;
    private final boolean enabled;
    private final Set<GrantedAuthority> groups;

    public UserPrincipal(User user) {
        this.password = user.getPassword();
        this.username = user.getUsername();
        this.enabled = user.isEnabled();
        this.groups = user.getGroups().stream()
            .filter(g -> g.isEnabled())
            .map(g -> new SimpleGrantedAuthority(g.getName())).collect(Collectors.toSet());
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return groups;
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
