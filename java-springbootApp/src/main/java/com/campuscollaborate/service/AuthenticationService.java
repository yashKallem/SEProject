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
import org.springframework.security.core.Authentication;
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
        try {
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
            var savedSuer= repository.save(user);
        var jwtToken = jwtService.generateToken(user);
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .httpStatus(HttpStatus.OK)
                .build();
        } catch (Exception e) {
            String errorMessage = "Failed to save user: " + e.getMessage();
            if(errorMessage.contains("could not execute statement"))
            {
                return  AuthenticationResponse.builder().httpStatus(HttpStatus.CONFLICT)
                        .token(errorMessage).build();
            }
            else {
                return  AuthenticationResponse.builder().httpStatus(HttpStatus.INTERNAL_SERVER_ERROR)
                        .token(errorMessage).build();
            }

        }
    }

    public AuthenticationResponse authenticate(@NotNull AuthenticationRequest request) {
        try {
            Authentication authentication= authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            request.getEmail(), request.getPassword()
                    )
            );
            var user = repository.findByEmail(request.getEmail())
                    .orElseThrow();
            var jwtToken = jwtService.generateToken(user);
            return AuthenticationResponse.builder()
                    .token(jwtToken)
                    .httpStatus(HttpStatus.OK)
                    .build();
        }
        catch  (Exception e) {
            String errorMessage = "Failed to Authenticate user: " + e.getMessage();
            if(errorMessage.contains("Bad credentials")){
                return AuthenticationResponse.builder()
                        .token(errorMessage)
                        .httpStatus(HttpStatus.UNAUTHORIZED)
                        .build();
            }
            else {
                return AuthenticationResponse.builder()
                        .token(errorMessage)
                        .httpStatus(HttpStatus.INTERNAL_SERVER_ERROR)
                        .build();
            }

        }
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

    public AuthenticationResponse checkToken(String tokenHeader) {
        String jwt = tokenHeader.substring(7);
       return AuthenticationResponse.builder()
               .httpStatus(HttpStatus.OK)
               .token(jwt)
               .build();
    }
}
