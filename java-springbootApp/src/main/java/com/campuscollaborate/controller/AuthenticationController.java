package com.campuscollaborate.controller;


import com.campuscollaborate.requestEntity.AuthenticationRequest;
import com.campuscollaborate.requestEntity.RegisterRequest;
import com.campuscollaborate.responseEntity.AuthenticationResponse;
import com.campuscollaborate.service.AuthenticationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 *   authentication controller
 *
 */ /**
 *     authentication controller
 *
 */ /**
 *    authentication controller
 *
 */ /**
 *   authentication controller
 *
 */ /**
 *   authentication controller
 *
 */ /**
 *  authentication controller
 *
 */
@RestController
@RequestMapping("/api/v1/auth")
@CrossOrigin("http://localhost:3000")
@RequiredArgsConstructor
public class AuthenticationController {


    private final AuthenticationService authenticationService;

    /**
     * register user
     *
     * @param request request
     * @return {@link ResponseEntity}
     * @see ResponseEntity
     * @see AuthenticationResponse
     */
    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse> registerUser(@RequestBody RegisterRequest request) {
        AuthenticationResponse response =authenticationService.register(request);
            return ResponseEntity.status(response.getHttpStatus()).body(response);
    }

    /**
     * check token
     *
     * @param tokenHeader tokenHeader
     * @return {@link ResponseEntity}
     * @see ResponseEntity
     * @see AuthenticationResponse
     */ //To validate token without using any other End points
    @GetMapping("/check-token")
    public ResponseEntity<AuthenticationResponse> checkToken(@RequestHeader("Authorization") String tokenHeader) {
        return  ResponseEntity.ok(authenticationService.checkToken(tokenHeader));
    }

    @PostMapping("/authenticate")
    public ResponseEntity<AuthenticationResponse> authenticateUser(@RequestBody AuthenticationRequest request) {
        AuthenticationResponse response =authenticationService.authenticate(request);
        return ResponseEntity.status(response.getHttpStatus()).body(response);
    }


    @PutMapping("/update_password")
    public ResponseEntity<AuthenticationResponse> updateUserPassword(@RequestBody AuthenticationRequest request) {
        return ResponseEntity.ok(authenticationService.updateUserPassword(request));
    }


}
