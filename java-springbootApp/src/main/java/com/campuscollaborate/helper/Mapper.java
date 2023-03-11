package com.campuscollaborate.helper;

import com.campuscollaborate.dto.ProjectDto;
import com.campuscollaborate.dto.UserDto;
import com.campuscollaborate.entity.ProjectEntity;
import com.campuscollaborate.entity.UserEntity;

import java.util.ArrayList;
import java.util.Optional;

public class Mapper {

    public static UserDto userEntityToUserDTOOOptional(Optional<UserEntity> userEntity){

        if (userEntity == null) {
            return null;
        }
        UserDto userDTO = new UserDto();
        userDTO.setUserId(userEntity.get().getUserId());
        userDTO.setGivenName(userEntity.get().getGivenName());
        userDTO.setLastName(userEntity.get().getLastName());
        userDTO.setEmail(userEntity.get().getEmail());
        userDTO.setPhone(userEntity.get().getPhone());
        userDTO.setProjects(new ArrayList<>());
        for (ProjectEntity project : userEntity.get().getProjects()) {
            userDTO.getProjects().add(ProjectEntityToProjectDtoWithoutUserDTO(project));
        }
        userDTO.setUsername(userEntity.get().getUsername());
        userDTO.setEducationLevel(userEntity.get().getEducationLevel());
        userDTO.setCourseOfStudy(userEntity.get().getCourseOfStudy());
        userDTO.setDob(userEntity.get().getDob());
        return userDTO;
    }
    public static UserDto userEntityToUserDTO(UserEntity userEntity){

        if (userEntity == null) {
            return null;
        }
        UserDto userDTO = new UserDto();
        userDTO.setUserId(userEntity.getUserId());
        userDTO.setGivenName(userEntity.getGivenName());
        userDTO.setLastName(userEntity.getLastName());
        userDTO.setEmail(userEntity.getEmail());
        userDTO.setPhone(userEntity.getPhone());
        userDTO.setProjects(new ArrayList<>());
        for (ProjectEntity project : userEntity.getProjects()) {
            userDTO.getProjects().add(ProjectEntityToProjectDtoWithoutUserDTO(project));
        }
        userDTO.setUsername(userEntity.getUsername());
        userDTO.setEducationLevel(userEntity.getEducationLevel());
        userDTO.setCourseOfStudy(userEntity.getCourseOfStudy());
        userDTO.setDob(userEntity.getDob());
        return userDTO;
    }

    public  static ProjectDto ProjectEntityToProjectDtoOptional(Optional<ProjectEntity> projectEntity){

        if (projectEntity == null) {
            return null;
        }
        ProjectDto projectDto = new ProjectDto();
        projectDto.setProjectId(projectEntity.get().getProjectId());
        projectDto.setProjectName(projectEntity.get().getProjectName());
        projectDto.setProjectDescription(projectEntity.get().getProjectDescription());
        projectDto.setCreatedAt(projectEntity.get().getCreatedAt());
        projectDto.setUserDTO(new UserDto());
        projectDto.getUserDTO().setUserId(projectEntity.get().getUser().getUserId());
        projectDto.getUserDTO().setDob(projectEntity.get().getUser().getDob());
        projectDto.getUserDTO().setEmail(projectEntity.get().getUser().getEmail());
        projectDto.getUserDTO().setPhone(projectEntity.get().getUser().getPhone());
        projectDto.getUserDTO().setGivenName(projectEntity.get().getUser().getGivenName());
        projectDto.getUserDTO().setLastName(projectEntity.get().getUser().getLastName());
        projectDto.getUserDTO().setEducationLevel(projectEntity.get().getUser().getEducationLevel());
        projectDto.getUserDTO().setCourseOfStudy(projectEntity.get().getUser().getCourseOfStudy());
        projectDto.getUserDTO().setRole(projectEntity.get().getUser().getRole().toString());
        projectDto.getUserDTO().setUsername(projectEntity.get().getUser().getEmail());
        return projectDto;
    }

    public  static ProjectDto ProjectEntityToProjectDto(ProjectEntity projectEntity){

        if (projectEntity == null) {
            return null;
        }
        ProjectDto projectDto = new ProjectDto();
        projectDto.setProjectId(projectEntity.getProjectId());
        projectDto.setProjectName(projectEntity.getProjectName());
        projectDto.setProjectDescription(projectEntity.getProjectDescription());
        projectDto.setCreatedAt(projectEntity.getCreatedAt());
        projectDto.setUserDTO(new UserDto());
        projectDto.getUserDTO().setUserId(projectEntity.getUser().getUserId());
        projectDto.getUserDTO().setDob(projectEntity.getUser().getDob());
        projectDto.getUserDTO().setEmail(projectEntity.getUser().getEmail());
        projectDto.getUserDTO().setPhone(projectEntity.getUser().getPhone());
        projectDto.getUserDTO().setGivenName(projectEntity.getUser().getGivenName());
        projectDto.getUserDTO().setLastName(projectEntity.getUser().getLastName());
        projectDto.getUserDTO().setEducationLevel(projectEntity.getUser().getEducationLevel());
        projectDto.getUserDTO().setCourseOfStudy(projectEntity.getUser().getCourseOfStudy());
        projectDto.getUserDTO().setRole(projectEntity.getUser().getRole().toString());
        projectDto.getUserDTO().setUsername(projectEntity.getUser().getEmail());
        return projectDto;
    }

    public  static ProjectDto ProjectEntityToProjectDtoWithoutUserDTO(ProjectEntity projectEntity){

        if (projectEntity == null) {
            return null;
        }
        ProjectDto projectDto = new ProjectDto();
        projectDto.setProjectId(projectEntity.getProjectId());
        projectDto.setProjectName(projectEntity.getProjectName());
        projectDto.setProjectDescription(projectEntity.getProjectDescription());
        projectDto.setCreatedAt(projectEntity.getCreatedAt());
        return projectDto;
    }
}
