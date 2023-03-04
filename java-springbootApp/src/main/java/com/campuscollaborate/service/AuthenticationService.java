package com.campuscollaborate.service;

import com.campuscollaborate.entity.UserEntity;
import com.campuscollaborate.repository.UserRepository;
import com.campuscollaborate.requestEntity.AuthenticationRequest;
import com.campuscollaborate.requestEntity.RegisterRequest;
import com.campuscollaborate.responseEntity.AuthenticationResponse;
import com.campuscollaborate.utility.Role;
import lombok.RequiredArgsConstructor;
import org.jetbrains.annotations.NotNull;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
    private final UserRepository repository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public AuthenticationResponse register(RegisterRequest request) {
        var user = UserEntity.builder()
                .givenName(request.getGivenName())
                .lastName(request.getLastName())
                .email(request.getEmail())
                .courseOfStudy(request.getCourseOfStudy())
                .dob(request.getDob())
                .educationLevel(request.getEducationLevel())
                .phone(request.getPhone())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(Role.USER)
                .build();
        repository.save(user);
        var jwtToken = jwtService.generateToken(user);
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .httpStatus(HttpStatus.OK)
                .build();
    }

    public AuthenticationResponse authenticate(@NotNull AuthenticationRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(), request.getPassword()
                )
        );
        var user = repository.findByEmail(request.getEmail())
                .orElseThrow();
        var jwtToken = jwtService.generateToken( user);
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .httpStatus(HttpStatus.OK)
                .build();
    }

    public AuthenticationResponse updateUserPassword (AuthenticationRequest request) {
        var user = repository.findByEmail(request.getEmail())
                .orElseThrow();
        if (!user.getEmail().isEmpty()) {
            if (passwordEncoder.matches(request.getPassword(),user.getPassword())) {
                user.setPassword(passwordEncoder.encode(request.getNewPassword()));
                repository.save(user);
                var jwtToken = jwtService.generateToken(user);
                return AuthenticationResponse.builder()
                        .token(jwtToken)
                        .httpStatus(HttpStatus.OK)
                        .build();

            }
        }
        return AuthenticationResponse.builder()
                .httpStatus(HttpStatus.NOT_FOUND)
                .build();
    }
}
