package com.campuscollaborate.controller;

import com.campuscollaborate.dto.ProjectDto;
import com.campuscollaborate.dto.UserDto;
import com.campuscollaborate.entity.UserEntity;
import com.campuscollaborate.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.concurrent.*;

/**
 * user controller
 */
@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    public UserService userService;

        @GetMapping("/all")
    public ResponseEntity<List<UserDto>> getAllUsers() {
        List<UserDto> usersDto=  userService.getAllUsers();
        if (usersDto != null && !usersDto.isEmpty()) {
            return ResponseEntity.ok().body(usersDto);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
//    @GetMapping("/all")
//    public ResponseEntity<List<UserDto>> getAllUsers() {
//        // Create a Callable that retrieves a list of users
//        Callable<List<UserDto>> getAllUsersTask = () -> {
//            return userService.getAllUsers();
//        };
//
//        // Create a new thread to execute the task
//        ExecutorService executor = Executors.newSingleThreadExecutor();
//        Future<List<UserDto>> future = executor.submit(getAllUsersTask);
//
//        try {
//            // Wait for the task to complete and return the result
//            List<UserDto> usersDto = future.get();
//            if (usersDto != null && !usersDto.isEmpty()) {
//                return ResponseEntity.ok().body(usersDto);
//            } else {
//                return ResponseEntity.notFound().build();
//            }
//        } catch (InterruptedException | ExecutionException e) {
//            // Handle any exceptions that may occur
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
//        } finally {
//            // Shutdown the executor
//            executor.shutdown();
//        }
//    }


    @GetMapping("/{userId}")
    public ResponseEntity<UserDto> getUserById(@PathVariable Long userId) {
        UserDto userDto = userService.getUserById(userId);
        if (userDto != null) {
            return ResponseEntity.ok().body(userDto);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/email/{email}")
    public ResponseEntity<UserDto> getUserByEmail(@PathVariable String email) {
        UserDto userDto = (userService.getUserByEmail(email));
        if (userDto != null) {
            return ResponseEntity.ok().body(userDto);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/{userId}/projects")
    public ResponseEntity<List<ProjectDto>> getProjectsByUserId(@PathVariable int userId) {
        List<ProjectDto> projects = userService.getProjectsByUserId(userId);
        return ResponseEntity.ok().body(projects);
    }


//    @GetMapping("/email/{email}/projects")
//    public List<ProjectEntity> getProjectsByUserEmail(@PathVariable String email) {
//        return userService.getProjectsByUserEmail(email);
//    }

    @GetMapping("/projects")
    public ResponseEntity<List<ProjectDto>> getProjectsByUserEmail(@Param("email") String email) {
        List<ProjectDto> projects = userService.getProjectsByUserEmail(email);
        return ResponseEntity.ok().body(projects);
    }

    //No Test case
    @PostMapping("")
    public UserEntity addUser(@RequestBody UserEntity user) {
        return userService.addUser(user);
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
