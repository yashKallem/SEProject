package com.campuscollaborate;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.doReturn;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import com.campuscollaborate.controller.UserController;
import com.campuscollaborate.dto.ProjectDto;
import com.campuscollaborate.dto.UserDto;
import com.campuscollaborate.entity.ProjectEntity;
import com.campuscollaborate.entity.UserEntity;
import com.campuscollaborate.service.UserService;

import com.campuscollaborate.utility.Role;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

public class UserControllerTest {

    private UserController userController;

    private UserService userServiceMock;

    @BeforeEach
    void setUp() {
        userServiceMock = mock(UserService.class);
        userController = new UserController();
        userController.userService = userServiceMock;
    }

    @Test
    @DisplayName("Test getAllUsers - Found")
    void testGetAllUsersFound() {
        // Setup our mock
        UserDto user1 = new UserDto();
        user1.setUserId(1L);
        user1.setRole(String.valueOf(Role.USER));
        user1.setLastName("doe");
        user1.setCourseOfStudy("CSE");
        user1.setPhone("1234567890");
        user1.setEmail("j.doe@wiu.edu");
        user1.setDob(new Date("02/03/1994"));
        user1.setEducationLevel("masters");
        user1.setGivenName("jom");


        UserDto user2 = new UserDto();
        user1.setUserId(1L);
        user1.setRole(String.valueOf(Role.USER));
        user1.setLastName("doe1");
        user1.setCourseOfStudy("CSE1");
        user1.setPhone("1234567891");
        user1.setEmail("j1.doe@wiu.edu");
        user1.setDob(new Date("02/03/1994"));
        user1.setEducationLevel("masters");
        user1.setGivenName("jom1");
        List<UserDto> userList = new ArrayList<>();
        userList.add(user1);
        userList.add(user2);
        doReturn(userList).when(userServiceMock).getAllUsers();

        // Execute the GET request
        ResponseEntity<List<UserDto>> response = userController.getAllUsers();

        // Assert the response
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(2, response.getBody().size());
    }

    @Test
    @DisplayName("Test getAllUsers - Not Found")
    void testGetAllUsersNotFound() {
        // Setup our mock
        doReturn(null).when(userServiceMock).getAllUsers();

        // Execute the GET request
        ResponseEntity<List<UserDto>> response = userController.getAllUsers();

        // Assert the response
        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
    }

    @Test
    @DisplayName("Test getUserById - Found")
    void testGetUserByIdFound() {
        // Setup our mock
        UserDto user1 = new UserDto();
        user1.setUserId(1L);
        user1.setRole(String.valueOf(Role.USER));
        user1.setLastName("doe");
        user1.setCourseOfStudy("CSE");
        user1.setPhone("1234567890");
        user1.setEmail("j.doe@wiu.edu");
        user1.setDob(new Date("02/03/1994"));
        user1.setEducationLevel("masters");
        user1.setGivenName("jom");
        doReturn(user1).when(userServiceMock).getUserById(anyLong());

        // Execute the GET request
        ResponseEntity<UserDto> response = userController.getUserById(1L);

        // Assert the response
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(1L, response.getBody().getUserId());
    }

    @Test
    @DisplayName("Test getUserById - Not Found")
    void testGetUserByIdNotFound() {
        // Setup our mock
        doReturn(null).when(userServiceMock).getUserById(anyLong());

        // Execute the GET request
        ResponseEntity<UserDto> response = userController.getUserById(1L);

        // Assert the response
        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
    }
}