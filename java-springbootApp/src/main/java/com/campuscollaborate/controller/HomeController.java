package com.campuscollaborate.controller;

import com.campuscollaborate.dto.HomeDto;
import com.campuscollaborate.dto.ProjectDto;
import com.campuscollaborate.dto.UserDto;
import com.campuscollaborate.service.ProjectService;
import com.campuscollaborate.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/feed")
@CrossOrigin("http://localhost:3000")
@RequiredArgsConstructor
public class HomeController {
    @Autowired
    public UserService userService;
    @Autowired
    private ProjectService projectService;
    @GetMapping("/")
    public ResponseEntity<HomeDto> getFeed(){
        List<UserDto> users = userService.getOnlyUsers();
        List<ProjectDto> projects = projectService.getOnlyProjects();
        return  ResponseEntity.ok(HomeDto.builder().users(users).projects(projects).build());
    }
}
