package com.campuscollaborate.controller;

import com.campuscollaborate.dto.ProjectDto;
import com.campuscollaborate.entity.ProjectEntity;
import com.campuscollaborate.helper.Mapper;
import com.campuscollaborate.repository.ProjectRepository;
import com.campuscollaborate.service.ProjectService;
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

    // @Autowired
    // private ProjectRepository projectRepository;
    @Autowired
    private ProjectService projectService;


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
    public ResponseEntity<ProjectDto> createProject(@RequestBody ProjectEntity project) {

        ProjectDto projectDto = projectService.createProject(project);
        if (projectDto == null) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        } else {
            return ResponseEntity.ok().body(projectDto);
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

    @GetMapping("/projects/{projectName}")
    public ResponseEntity<ProjectDto> getProjectsByProjectName(@PathVariable String projectName) {
        ProjectDto project = projectService.findByProjectName(projectName);
        if (project == null) {
            return ResponseEntity.notFound().build();
        } else {
            return ResponseEntity.ok().body(project);
        }
    }


    @PutMapping("/{id}")
    public ResponseEntity<ProjectDto> updateProject(@PathVariable(value = "id") int projectId,
                                                    @RequestBody ProjectEntity projectDetails) {
        return projectService.updateProject(projectId, projectDetails);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteProject(@PathVariable(value = "id") int projectId) {
        return projectService.deleteProject(projectId);

    }
}
