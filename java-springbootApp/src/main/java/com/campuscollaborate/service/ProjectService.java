package com.campuscollaborate.service;

import com.campuscollaborate.dto.ProjectDto;
import com.campuscollaborate.entity.ProjectEntity;
import com.campuscollaborate.entity.UserEntity;
import com.campuscollaborate.helper.Mapper;
import com.campuscollaborate.repository.ProjectRepository;
import com.campuscollaborate.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ProjectService {
    @Autowired
    private UserRepository userRepository;
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

    public ProjectDto createProject(ProjectDto project) {
        ProjectEntity projectEntity = new ProjectEntity();
        projectEntity.setProjectName(project.getProjectName());
        projectEntity.setProjectDescription(project.getProjectDescription());
        projectEntity.setProjectRole(project.getProjectRole());
        projectEntity.setLocation(project.getLocation());
        projectEntity.setPublishedAt(project.getPublishedAt());
        projectEntity.setJobDescription(project.getJobDescription());
        projectEntity.setDeadline(project.getDeadline());
        // Get the user ID from the database using the email
        Optional<UserEntity> publishedBy = userRepository.findByEmail(project.getEmail());
        if (publishedBy.isEmpty()) {
            return null;
        }
        projectEntity.setPublishedBy(publishedBy.get());
        ProjectEntity createdProject = projectRepository.save(projectEntity);
        return Mapper.projectEntityToProjectDto(createdProject);
    }

    public ProjectDto updateProject( ProjectDto project) {

        ProjectEntity projectEntity = new ProjectEntity();
        projectEntity.setProjectName(project.getProjectName());
        projectEntity.setProjectDescription(project.getProjectDescription());
        projectEntity.setProjectRole(project.getProjectRole());
        projectEntity.setLocation(project.getLocation());
        projectEntity.setPublishedAt(project.getPublishedAt());
        projectEntity.setJobDescription(project.getJobDescription());
        projectEntity.setDeadline(project.getDeadline());
        projectEntity.setId(project.getProjectId());
        Optional<UserEntity> publishedBy = userRepository.findByEmail(project.getEmail());

        List<ProjectEntity> projectEntities= projectRepository.findByPublishedBy(publishedBy);

        boolean doesProjectBelongsToUser = projectEntities.stream().anyMatch(proj -> proj.getId().equals(project.getProjectId()));
        if(!doesProjectBelongsToUser){
            return null;
        }
        if(publishedBy.isPresent()){
            projectEntity.setPublishedBy(publishedBy.get());
            ProjectEntity updatedProject = projectRepository.save(projectEntity);
            return Mapper.projectEntityToProjectDto(updatedProject);
        }
        else {
            return  null;
        }

    }

    public ProjectDto deleteProject( ProjectDto project) {

        ProjectEntity projectEntity = new ProjectEntity();
        projectEntity.setId(project.getProjectId());
        Optional<UserEntity> publishedBy = userRepository.findByEmail(project.getEmail());

        List<ProjectEntity> projectEntities= projectRepository.findByPublishedBy(publishedBy);

        boolean doesProjectBelongsToUser = projectEntities.stream().anyMatch(proj -> proj.getId().equals(project.getProjectId()));
        if(!doesProjectBelongsToUser){
            return null;
        }
        projectRepository.deleteById(projectEntity.getId());
        Optional<ProjectEntity> isProjectDeleted = projectRepository.findById(project.getProjectId());
        ProjectDto projectDto = new ProjectDto();
        if(isProjectDeleted.isEmpty()){
            projectDto.setMessage(project.getProjectName() +"is deleted");
        }
        else {
            projectDto.setMessage(project.getProjectName() +"is Deletion Failed");
        }
        return projectDto;

    }

    public ResponseEntity<?> deleteProject(long projectId) {
        var project = projectRepository.findById(projectId);
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

    public List<ProjectDto> findByPublishedBy(String email) {
        var user= userRepository.findByEmail(email);
        if(user.isPresent()){
            List<ProjectEntity> projectEntities= projectRepository.findByPublishedBy(user);
            List<ProjectDto> projects = new ArrayList<>();
            for (ProjectEntity project : projectEntities ) {
                projects.add(Mapper.projectEntityToProjectDto(project));
            }
            return projects;
        }
        return  null;
    }
}
