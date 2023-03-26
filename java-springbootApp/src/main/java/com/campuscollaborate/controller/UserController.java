package com.campuscollaborate.controller;

import com.campuscollaborate.dto.ProjectDto;
import com.campuscollaborate.dto.UserDto;
import com.campuscollaborate.entity.ProjectEntity;
import com.campuscollaborate.entity.UserEntity;
import com.campuscollaborate.service.AuthenticationService;
import com.campuscollaborate.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * user controller
 */
@RestController
@RequestMapping("/api/v1/users")
//@CrossOrigin("http://localhost:3000")
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
