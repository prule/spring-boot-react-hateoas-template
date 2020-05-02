package com.example.demo.user;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;

@RequiredArgsConstructor
public class AuthenticatedUser {

    private final Authentication authentication;

    public static AuthenticatedUser getInstance() {
        final Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.isAuthenticated()) {
            return new AuthenticatedUser(authentication);
        }
        return null;
    }

    private UserDetails getPrincipal() {
        return (UserDetails) authentication.getPrincipal();
    }

    public boolean hasGroup(UserGroup.Group group) {
        if (authentication != null) {
            return authentication.getAuthorities().stream().anyMatch(g -> g.getAuthority().equals(group.name()));
        }
        return false;
    }

    public boolean is(String username) {
        return getPrincipal().getUsername().equals(username);
    }

    public String getUsername() {
        return getPrincipal().getUsername();
    }
}
