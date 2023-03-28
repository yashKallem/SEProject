package com.campuscollaborate.controller;

import com.campuscollaborate.dto.UserDto;
import com.campuscollaborate.entity.UserEntity;
import com.campuscollaborate.helper.UserMessage;
import com.campuscollaborate.service.AuthenticationService;
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

    @Autowired
    public AuthenticationService authenticationService;

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
    public ResponseEntity<UserDto> getUserByEmail(@RequestHeader("Authorization") String bearerToken, @RequestParam("email") String email) {
        UserDto userDto = new UserDto();
        try {
            boolean isValid = authenticationService.checkIfTheUserIsAccessingHisOwnAccount(bearerToken, email);
            if (!isValid) {
                userDto.setErrorMessage(UserMessage.TOKEN_MISMATCH);
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(userDto);
            }
            userDto = userService.getUserByEmail(email);
            if (userDto != null) {
                return ResponseEntity.ok().body(userDto);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception ex) {
            userDto.setErrorMessage(" REASON: " + ex.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(userDto);
        }
    }

    @PutMapping("/about")
    public ResponseEntity<UserDto> updateAboutSection(@RequestHeader("Authorization") String bearerToken, @RequestBody UserDto userDto) {
        try {
            boolean isValid = authenticationService.checkIfTheUserIsAccessingHisOwnAccount(bearerToken, userDto.getEmail());
            if (!isValid) {
                userDto.setErrorMessage(UserMessage.TOKEN_MISMATCH);
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(userDto);
            }
            UserDto user = userService.updateUserAboutSection(userDto);
            if (user.getMessage().equals(UserMessage.ABOUT_UPDATED)) {
                return ResponseEntity.status(HttpStatus.OK).body(user);
            } else if (user.getMessage().equals(UserMessage.USER_NOT_FOUND)) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(user);
            } else {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(user);
            }
        } catch (Exception ex) {
            userDto.setErrorMessage(UserMessage.ABOUT_UPDATED_FAILED + " REASON: " + ex.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(userDto);
        }


    }

    @PutMapping("/contact")
    public ResponseEntity<UserDto> updateContactSection(@RequestHeader("Authorization") String bearerToken,@RequestBody UserDto userDto) {
        try {
            boolean isValid = authenticationService.checkIfTheUserIsAccessingHisOwnAccount(bearerToken, userDto.getEmail());
            if (!isValid) {
                userDto.setErrorMessage(UserMessage.TOKEN_MISMATCH);
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(userDto);
            }
            UserDto user = userService.updateContactSection(userDto);
            if (user.getMessage().equals(UserMessage.CONTACT_UPDATED)) {
                return ResponseEntity.ok().body(user);
            } else if (user.getErrorMessage().equals(UserMessage.USER_NOT_FOUND)) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(user);
            } else {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(user);
            }
        }
        catch (Exception ex){
            userDto.setErrorMessage(" REASON "+ ex.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(userDto);
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
