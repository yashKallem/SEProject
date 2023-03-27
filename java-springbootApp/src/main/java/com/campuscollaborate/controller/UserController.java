package com.campuscollaborate.controller;

import com.campuscollaborate.dto.UserDto;
import com.campuscollaborate.entity.UserEntity;
import com.campuscollaborate.responseEntity.AuthenticationResponse;
import com.campuscollaborate.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * user controller
 */
@RestController
@RequestMapping("/api/v1/users")
@CrossOrigin(origins = "http://localhost:3000")
@RequiredArgsConstructor
public class UserController {

    @Autowired
    public UserService userService;
    @GetMapping("/all")
    public ResponseEntity<List<UserDto>> getAllUsers() {
        List<UserDto> usersDto = userService.getAllUsers();
        if (usersDto != null && !usersDto.isEmpty()) {
            return ResponseEntity.ok().body(usersDto);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/{userId}")
    public ResponseEntity<UserDto> getUserById(@PathVariable Long userId) {
        UserDto userDto = userService.getUserById(userId);
        if (userDto != null) {
            return ResponseEntity.ok().body(userDto);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/profile")
    public ResponseEntity<UserDto> getUserByEmail(@RequestHeader("Authorization") String bearerToken,@RequestParam("email") String email) {
        if (email.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        else {
            UserDto userDto = (userService.getUserByEmail(email));
            if (userDto != null) {
                return ResponseEntity.ok().body(userDto);
            } else {
                return ResponseEntity.notFound().build();
            }
        }

    }

    @PutMapping("/about")
    public ResponseEntity<AuthenticationResponse> updateAboutSection(@RequestBody UserDto userDto) {
        AuthenticationResponse authenticationResponse= userService.updateUserAboutSection(userDto);
        return ResponseEntity.ok().body(authenticationResponse);
    }

    @PutMapping("/contact")
    public ResponseEntity<AuthenticationResponse> updateContactSection(@RequestBody UserDto userDto) {
        AuthenticationResponse authenticationResponse= userService.updateContactSection(userDto);
        return ResponseEntity.ok().body(authenticationResponse);
    }

    @GetMapping("/{userId}/projects")
    public ResponseEntity<UserDto> getProjectsByUserId(@PathVariable Long userId) {
        UserDto userDto = userService.getUserAndHisProjectsById(userId);
        return ResponseEntity.ok().body(userDto);
    }

    @PutMapping("/{userId}")
    public UserEntity updateUser(@RequestBody UserEntity user) {
        return userService.updateUser(user);
    }

    @DeleteMapping("/{email}")
    public ResponseEntity<Boolean> deleteUser(@PathVariable String email) {
        if (userService.deleteUser(email)) {
            return ResponseEntity.ok().body(true);
        } else {
            return ResponseEntity.ok().body(false);
        }
    }
}
