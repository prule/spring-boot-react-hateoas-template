package com.example.demo.user;

import com.example.demo.common.security.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collections;

@RequiredArgsConstructor
@RestController
@Transactional
public class AuthenticationApi {

    private final AuthenticationManager authenticationManager;
    private final JwtTokenProvider jwtTokenProvider;
    private final UserRepository userRepository;

    @PostMapping("/api/1/auth/login")
    public AuthenticateResource login(@RequestBody AuthenticateResource resource) {

        String username = resource.getUsername();
        String password = resource.getPassword();

        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
            String token = jwtTokenProvider.createToken(username, Collections.emptyList());

            return new AuthenticateResource(username, token, userRepository.findByUsername(username));
        } catch (AuthenticationException e) {
            throw new BadCredentialsException("Invalid username/password");
        }
    }

    @GetMapping("/api/1/user/me")
    public UserResource me() {
        try {
            final AuthenticatedUser user = AuthenticatedUser.getInstance();
            if (user != null) {
                return new UserResource().fromModel(userRepository.findByUsername(user.getUsername()));
            }
        } catch (Exception e) {
            // ignore
        }
        return null;
    }
}
