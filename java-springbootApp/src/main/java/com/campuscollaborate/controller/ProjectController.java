package com.campuscollaborate.controller;

import com.campuscollaborate.dto.ProjectDto;
import com.campuscollaborate.entity.ProjectEntity;
import com.campuscollaborate.helper.Mapper;
import com.campuscollaborate.repository.ProjectRepository;
import com.campuscollaborate.service.ProjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/projects")
public class ProjectController {

    // @Autowired
    // private ProjectRepository projectRepository;
    @Autowired
    private ProjectService projectService;
    @Autowired
    private ProjectRepository projectRepository;

    @GetMapping("/all")
    public ResponseEntity<List<ProjectDto>> getAllProjects() {
        List<ProjectDto> projects = projectService.getAllProjects();
        return ResponseEntity.ok().body(projects);
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
    public ProjectEntity createProject(@RequestBody ProjectEntity project) {
        return projectService.createProject(project);

    }

    @GetMapping("/user")
    public ResponseEntity<ProjectDto> findByProjectNameWithUser(@Param("project_name") String project_name) {

        Optional<ProjectEntity> project = projectRepository.findByProjectName(project_name);
        ProjectDto projectDto = new ProjectDto();
        if (project.isPresent()) {
            projectDto = Mapper.ProjectEntityToProjectDtoOptional(project);
        }
        return ResponseEntity.ok().body(projectDto);
    }

    @GetMapping("/projects/{projectName}")
    public ResponseEntity<List<ProjectDto>> getProjectsByProjectName(@PathVariable String projectName) {
        List<ProjectEntity> projectEntities = projectRepository.findAllByProjectName(projectName);
        List<ProjectDto> projects = new ArrayList<>();
        for (ProjectEntity project : projectEntities ) {
            projects.add(Mapper.ProjectEntityToProjectDto(project));
        }
        return ResponseEntity.ok(projects);
    }


    @PutMapping("/{id}")
    public ResponseEntity<ProjectEntity> updateProject(@PathVariable(value = "id") int projectId,
                                                       @RequestBody ProjectEntity projectDetails) {
        return projectService.updateProject(projectId, projectDetails);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteProject(@PathVariable(value = "id") int projectId) {
        return projectService.deleteProject(projectId);

    }
}
