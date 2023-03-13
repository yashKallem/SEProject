package com.campuscollaborate.service;

import com.campuscollaborate.dto.ProjectDto;
import com.campuscollaborate.entity.ProjectEntity;
import com.campuscollaborate.helper.Mapper;
import com.campuscollaborate.repository.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ProjectService {

     @Autowired
     private ProjectRepository projectRepository;
    public List<ProjectDto> getAllProjects() {
        List<ProjectEntity> projectEntities=  projectRepository.findAll();
        List<ProjectDto> projects = new ArrayList<>();
        for (ProjectEntity project : projectEntities ) {
            projects.add(Mapper.projectEntityToProjectDto(project));
        }
        return projects;
    }

    public List<ProjectDto> getOnlyProjects() {
        List<ProjectEntity> projectEntities=  projectRepository.findAll();
        List<ProjectDto> projects = new ArrayList<>();
        for (ProjectEntity project : projectEntities ) {
            projects.add(Mapper.getOnlyProjectDto(project));
        }
        return projects;
    }

    public Optional<ProjectDto> getProjectById(long projectId) {
        Optional<ProjectEntity> project = projectRepository.findById(projectId);
        if (project.isPresent()) {
            return Optional.ofNullable(Mapper.projectEntityToProjectDtoOptional(project));
        } else {
           return Optional.empty();
        }
    }

    public ProjectDto createProject(ProjectEntity project) {
       ProjectEntity proj=   projectRepository.save(project);
        return  Mapper.projectEntityToProjectDtoWithoutUserDTO(proj);
    }

    public ResponseEntity<ProjectDto> updateProject(long projectId, ProjectEntity projectDetails) {
        Optional<ProjectEntity> project = projectRepository.findById(projectId);
        if (project.isPresent()) {
            ProjectEntity updatedProject = project.get();
            updatedProject.setProjectName(projectDetails.getProjectName());
            updatedProject.setProjectDescription(projectDetails.getProjectDescription());
            updatedProject.setProjectRole(projectDetails.getProjectRole());
            updatedProject.setId(projectId);
            updatedProject.setDeadline(projectDetails.getDeadline());
            updatedProject.setLocation(projectDetails.getLocation());
            updatedProject.setPublishedBy(projectDetails.getPublishedBy());
            updatedProject.setJobDescription(projectDetails.getJobDescription());
            // updatedProject.setUser(projectDetails.getUserId());
            updatedProject =projectRepository.save(updatedProject);

            return ResponseEntity.ok().body(Mapper.projectEntityToProjectDto(updatedProject));
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    public ResponseEntity<?> deleteProject(long projectId) {
        Optional<ProjectEntity> project = projectRepository.findById(projectId);
        if (project.isPresent()) {
            projectRepository.delete(project.get());
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    public ProjectDto findByProjectName(String projectName) {
        ProjectEntity project=  projectRepository.findByProjectName(projectName);
        ProjectDto projectDto = new ProjectDto();
        if (project != null) {
            projectDto = Mapper.projectEntityToProjectDtoOptional(Optional.of(project));
        }
        return projectDto;
    }
}
