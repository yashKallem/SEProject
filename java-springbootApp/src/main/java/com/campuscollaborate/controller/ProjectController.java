package com.campuscollaborate.controller;

import com.campuscollaborate.dto.ProjectDto;
import com.campuscollaborate.helper.UserMessage;
import com.campuscollaborate.service.AuthenticationService;
import com.campuscollaborate.service.ProjectService;
import com.campuscollaborate.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;


@RestController
@RequestMapping("/api/v1/projects")
@CrossOrigin("http://localhost:3000")
@RequiredArgsConstructor
public class ProjectController {

    @Autowired
    private ProjectService projectService;
    @Autowired
    public UserService userService;

    @Autowired
    public AuthenticationService authenticationService;

    @GetMapping("/all")
    public ResponseEntity<List<ProjectDto>> getAllProjects() {
        List<ProjectDto> projects = projectService.getAllProjects();
        if (projects.isEmpty()) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.ok().body(projects);
        }

    }

    @GetMapping("/{id}")
    public ResponseEntity<Optional<ProjectDto>> getProjectById(@PathVariable(value = "id") int projectId) {

        Optional<ProjectDto> project = projectService.getProjectById(projectId);
        if (project.isPresent()) {
            return ResponseEntity.ok().body(project);
        } else {
            ResponseEntity.notFound().build();
        }

        return null;
    }

    @PostMapping("/add")
    public ResponseEntity<ProjectDto> createProject(@RequestHeader("Authorization") String bearerToken,@RequestBody ProjectDto project) {

        try{
            if (project.getEmail().isEmpty()) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
            }
            else{
                boolean isValid = authenticationService.checkIfTheUserIsAccessingHisOwnAccount(bearerToken, project.getEmail());
                if (!isValid) {
                    return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
                }
                ProjectDto projectDto = projectService.createProject(project);
                if (projectDto == null) {
                    return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
                } else {
                    return ResponseEntity.ok().body(projectDto);
                }
            }
        }
        catch (Exception ex) {
            ProjectDto projectDto = new ProjectDto();
            projectDto.setErrorMessage(ex.getMessage());
            return ResponseEntity.internalServerError().body(projectDto);
        }
    }

    @PutMapping("/update")
    public ResponseEntity<ProjectDto> updateProject(@RequestHeader("Authorization") String bearerToken, @RequestBody ProjectDto project) {
        ProjectDto projectDto = new ProjectDto();
        try {
            if (project.getProjectId() == null || project.getEmail().isEmpty()) {
                project.setErrorMessage(UserMessage.TOKEN_MISMATCH);
                return  ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(project);
            } else {
                boolean isValid = authenticationService.checkIfTheUserIsAccessingHisOwnAccount(bearerToken, project.getEmail());
                if (!isValid) {
                    project.setErrorMessage(UserMessage.TOKEN_MISMATCH);
                    return  ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(project);
                }
                projectDto = projectService.updateProject(project);
                if (projectDto == null) {
                    return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
                } else {
                    return ResponseEntity.ok().body(projectDto);
                }
            }
        } catch (Exception ex) {

            projectDto.setErrorMessage(ex.getMessage());
            return ResponseEntity.internalServerError().body(projectDto);
        }

    }

    @DeleteMapping("/delete")
    public ResponseEntity<ProjectDto> deleteProject(@RequestHeader("Authorization") String bearerToken, @RequestBody ProjectDto project) {
        try {
            if (project.getProjectId() == null || project.getEmail().isEmpty()) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
            } else {
                boolean isValid = authenticationService.checkIfTheUserIsAccessingHisOwnAccount(bearerToken, project.getEmail());
                if (!isValid) {
                    project.setErrorMessage(UserMessage.TOKEN_MISMATCH);
                    return  ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(project);
                }
                ProjectDto projectDto = projectService.deleteProject(project);
                if (projectDto == null) {
                    return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
                } else {
                    return ResponseEntity.ok().body(projectDto);
                }
            }
        } catch (Exception ex) {
            ProjectDto projectDto = new ProjectDto();
            projectDto.setErrorMessage(ex.getMessage());
            return ResponseEntity.internalServerError().body(projectDto);
        }
    }

    @GetMapping("/user")
    public ResponseEntity<ProjectDto> findByProjectNameWithUser(@Param("project_name") String project_name) {
        ProjectDto project = projectService.findByProjectName(project_name);
        if (project == null) {
            return ResponseEntity.notFound().build();
        } else {
            return ResponseEntity.ok().body(project);
        }

    }

}
