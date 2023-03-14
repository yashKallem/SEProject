package com.campuscollaborate.helper;

import com.campuscollaborate.dto.*;
import com.campuscollaborate.entity.*;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.Optional;

public class Mapper {

    public static UserDto getUserEntityToUserDTOOOptionalForProjects(Optional<UserEntity> userEntity){

        if (userEntity.isEmpty()) return null;
        UserDto userDTO = new UserDto();
        userDTO.setUserId(userEntity.get().getUserId());
        userDTO.setGivenName(userEntity.get().getGivenName());
        userDTO.setLastName(userEntity.get().getLastName());
        userDTO.setEmail(userEntity.get().getEmail());
        userDTO.setPhone(userEntity.get().getPhone());
        userDTO.setProjects(new ArrayList<>());
        for (ProjectEntity project : userEntity.get().getProjects()) {
            userDTO.getProjects().add(projectEntityToProjectDtoWithoutUserDTO(project));
        }
        userDTO.getProjects().sort(Comparator.comparing(ProjectDto::getPublishedAt));
        return userDTO;
    }


    public static UserDto userEntityToUserDTOOOptional(Optional<UserEntity> userEntity){

        if (userEntity.isEmpty()) return null;
        UserDto userDTO = new UserDto();
        userDTO.setUserId(userEntity.get().getUserId());
        userDTO.setGivenName(userEntity.get().getGivenName());
        userDTO.setLastName(userEntity.get().getLastName());
        userDTO.setEmail(userEntity.get().getEmail());
        userDTO.setPhone(userEntity.get().getPhone());
        userDTO.setRole(userEntity.get().getRole().toString());
        userDTO.setProjects(new ArrayList<>());
        for (ProjectEntity project : userEntity.get().getProjects()) {
            userDTO.getProjects().add(projectEntityToProjectDtoWithoutUserDTO(project));
        }
        userDTO.setEducationHistory(new ArrayList<>());
        for (EducationEntity educationEntity : userEntity.get().getEducationEntities()) {
            userDTO.getEducationHistory().add(educationEntityToEducationDto(educationEntity));
        }
        userDTO.setSummary( summaryEntityToSummaryDto(userEntity.get().getSummary()));
        userDTO.setWorkHistory(new ArrayList<>());
        for (WorkExperienceEntity workExperience : userEntity.get().getWorkExperienceEntities()) {
            userDTO.getWorkHistory().add(workExperienceEntityToWorkExperienceDto(workExperience));
        }
        userDTO.setSkills(new ArrayList<>());
        for (SkillEntity skillEntity : userEntity.get().getSkillEntities()) {
            userDTO.getSkills().add(skillEntityToSkillDto(skillEntity));
        }
        userDTO.setNetwork(new ArrayList<>());
        for (NetworkEntity networkEntity : userEntity.get().getNetworkEntityList()) {
            userDTO.getNetwork().add(networkEntityToNetworkDto(networkEntity));
        }
        userDTO.getEducationHistory().sort(Comparator.comparing(EducationDto::getStartYear));
        userDTO.getWorkHistory().sort(Comparator.comparing(WorkExperienceDto::getFromDate));


        userDTO.setUsername(userEntity.get().getUsername());
        userDTO.setEducationLevel(userEntity.get().getEducationLevel());
        userDTO.setCourseOfStudy(userEntity.get().getCourseOfStudy());
        userDTO.setDob(userEntity.get().getDob());
        return userDTO;
    }

    public static UserDto getOnlyUserDTO(UserEntity userEntity) {
        if (userEntity == null) {
            return null;
        }
        UserDto userDTO = new UserDto();
        userDTO.setUserId(userEntity.getUserId());
        userDTO.setGivenName(userEntity.getGivenName());
        userDTO.setLastName(userEntity.getLastName());
        userDTO.setEmail(userEntity.getEmail());
        userDTO.setPhone(userEntity.getPhone());
        userDTO.setRole(userEntity.getRole().toString());
        userDTO.setEducationLevel(userEntity.getEducationLevel());
        userDTO.setCourseOfStudy(userEntity.getCourseOfStudy());
        userDTO.setDob(userEntity.getDob());
        return  userDTO;
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
        userDTO.setRole(userEntity.getRole().toString());
        userDTO.setProjects(new ArrayList<>());
        for (ProjectEntity project : userEntity.getProjects()) {
            userDTO.getProjects().add(projectEntityToProjectDtoWithoutUserDTO(project));
        }
        userDTO.setEducationHistory(new ArrayList<>());
        for (EducationEntity educationEntity : userEntity.getEducationEntities()) {
            userDTO.getEducationHistory().add(educationEntityToEducationDto(educationEntity));
        }
        userDTO.setSummary( summaryEntityToSummaryDto(userEntity.getSummary()));
       userDTO.setWorkHistory(new ArrayList<>());
        for (WorkExperienceEntity workExperience : userEntity.getWorkExperienceEntities()) {
            userDTO.getWorkHistory().add(workExperienceEntityToWorkExperienceDto(workExperience));
        }
        userDTO.setSkills(new ArrayList<>());
        for (SkillEntity skillEntity : userEntity.getSkillEntities()) {
            userDTO.getSkills().add(skillEntityToSkillDto(skillEntity));
        }
        userDTO.setNetwork(new ArrayList<>());
        for (NetworkEntity networkEntity : userEntity.getNetworkEntityList()) {
            userDTO.getNetwork().add(networkEntityToNetworkDto(networkEntity));
        }
        userDTO.getEducationHistory().sort(Comparator.comparing(EducationDto::getStartYear));
        userDTO.getWorkHistory().sort(Comparator.comparing(WorkExperienceDto::getFromDate));


        userDTO.setUsername(userEntity.getUsername());
        userDTO.setEducationLevel(userEntity.getEducationLevel());
        userDTO.setCourseOfStudy(userEntity.getCourseOfStudy());
        userDTO.setDob(userEntity.getDob());
        return userDTO;
    }

    public  static ProjectDto projectEntityToProjectDtoOptional(Optional<ProjectEntity> projectEntity){
        ProjectDto projectDto = new ProjectDto();
        if (projectEntity.isEmpty()) return null;
        else{
            projectDto.setProjectId(projectEntity.get().getId());
            projectDto.setProjectName(projectEntity.get().getProjectName());
            projectDto.setProjectDescription(projectEntity.get().getProjectDescription());
            projectDto.setPublishedAt(projectEntity.get().getPublishedAt());
            projectDto.setJobDescription(projectEntity.get().getJobDescription());
            projectDto.setProjectRole(projectEntity.get().getProjectRole());
            projectDto.setLocation(projectEntity.get().getLocation());
            projectDto.setDeadline(projectEntity.get().getDeadline());

            projectDto.setPublishedBy(new UserDto());
            projectDto.getPublishedBy().setUserId(projectEntity.get().getPublishedBy().getUserId());
            projectDto.getPublishedBy().setDob(projectEntity.get().getPublishedBy().getDob());
            projectDto.getPublishedBy().setEmail(projectEntity.get().getPublishedBy().getEmail());
            projectDto.getPublishedBy().setPhone(projectEntity.get().getPublishedBy().getPhone());
            projectDto.getPublishedBy().setGivenName(projectEntity.get().getPublishedBy().getGivenName());
            projectDto.getPublishedBy().setLastName(projectEntity.get().getPublishedBy().getLastName());
            projectDto.getPublishedBy().setEducationLevel(projectEntity.get().getPublishedBy().getEducationLevel());
            projectDto.getPublishedBy().setCourseOfStudy(projectEntity.get().getPublishedBy().getCourseOfStudy());
            projectDto.getPublishedBy().setRole(projectEntity.get().getPublishedBy().getRole().toString());
            projectDto.getPublishedBy().setUsername(projectEntity.get().getPublishedBy().getEmail());
        }

        return projectDto;
    }

    public  static ProjectDto getOnlyProjectDto(ProjectEntity projectEntity) {
        if (projectEntity == null) {
            return null;
        }
        ProjectDto projectDto = new ProjectDto();
        projectDto.setProjectId(projectEntity.getId());
        projectDto.setProjectName(projectEntity.getProjectName());
        projectDto.setProjectDescription(projectEntity.getProjectDescription());
        projectDto.setPublishedAt(projectEntity.getPublishedAt());
        projectDto.setJobDescription(projectEntity.getJobDescription());
        projectDto.setProjectRole(projectEntity.getProjectRole());
        projectDto.setLocation(projectEntity.getLocation());
        projectDto.setDeadline(projectEntity.getDeadline());
        return projectDto;
    }

    public  static ProjectDto projectEntityToProjectDto(ProjectEntity projectEntity){

        if (projectEntity == null) {
            return null;
        }
        ProjectDto projectDto = new ProjectDto();
        projectDto.setProjectId(projectEntity.getId());
        projectDto.setProjectName(projectEntity.getProjectName());
        projectDto.setProjectDescription(projectEntity.getProjectDescription());
        projectDto.setPublishedAt(projectEntity.getPublishedAt());
        projectDto.setJobDescription(projectEntity.getJobDescription());
        projectDto.setProjectRole(projectEntity.getProjectRole());
        projectDto.setLocation(projectEntity.getLocation());
        projectDto.setDeadline(projectEntity.getDeadline());

        projectDto.setPublishedBy(new UserDto());
        projectDto.getPublishedBy().setUserId(projectEntity.getPublishedBy().getUserId());
        projectDto.getPublishedBy().setEmail(projectEntity.getPublishedBy().getEmail());
        projectDto.getPublishedBy().setPhone(projectEntity.getPublishedBy().getPhone());
        projectDto.getPublishedBy().setGivenName(projectEntity.getPublishedBy().getGivenName());
        projectDto.getPublishedBy().setLastName(projectEntity.getPublishedBy().getLastName());
        return projectDto;
    }

    public  static ProjectDto projectEntityToProjectDtoWithoutUserDTO(ProjectEntity projectEntity){

        if (projectEntity == null) {
            return null;
        }
        ProjectDto projectDto = new ProjectDto();
        projectDto.setProjectId(projectEntity.getId());
        projectDto.setProjectName(projectEntity.getProjectName());
        projectDto.setProjectDescription(projectEntity.getProjectDescription());
        projectDto.setPublishedAt(projectEntity.getPublishedAt());
        projectDto.setJobDescription(projectEntity.getJobDescription());
        projectDto.setProjectRole(projectEntity.getProjectRole());
        projectDto.setLocation(projectEntity.getLocation());
        projectDto.setDeadline(projectEntity.getDeadline());
        return projectDto;
    }

    public static EducationDto educationEntityToEducationDto(EducationEntity educationEntity){

        if(educationEntity ==null){
            return null;
        }
        return EducationDto.builder()
                .id(educationEntity.getId())
                .degree(educationEntity.getDegree())
                .startYear(educationEntity.getStartYear())
                .endYear(educationEntity.getEndYear())
                .department(educationEntity.getDepartment())
                .instituteName(educationEntity.getInstituteName()).build();

    }

    public static WorkExperienceDto workExperienceEntityToWorkExperienceDto(WorkExperienceEntity workExperience){

        if(workExperience ==null){
            return null;
        }
        return WorkExperienceDto.builder()
                .id(workExperience.getId())
                .achievements(workExperience.getAchievements())
                .companyName(workExperience.getCompanyName())
                .workIndustry(workExperience.getWorkIndustry())
                .fromDate(workExperience.getFromDate())
                .tillDate(workExperience.getTillDate())
                .workTitle(workExperience.getWorkTitle())
        .build();
    }

    public static SkillDto skillEntityToSkillDto(SkillEntity skillEntity){

        if(skillEntity ==null){
            return null;
        }
        return SkillDto.builder()
                .id(skillEntity.getId())
                .skill(skillEntity.getSkill())
                .build();
    }

    public static NetworkDto networkEntityToNetworkDto(NetworkEntity networkEntity){
        NetworkDto networkDto = new NetworkDto();
        networkDto.setId(networkEntity.getId());
        networkDto.setNetworklist(new ArrayList<>());
        NetworkBasicUserDto userDto = new NetworkBasicUserDto();
        userDto.setEmail(networkEntity.getConnectedUser().getEmail());
        userDto.setId(networkEntity.getConnectedUser().getUserId());
        userDto.setGivenName(networkEntity.getConnectedUser().getGivenName());
        userDto.setLastName(networkEntity.getConnectedUser().getLastName());
        userDto.setUserId(networkEntity.getConnectedUser().getUserId());

        networkDto.getNetworklist().add(userDto);

      return  networkDto;
    }
    public static SummaryDto summaryEntityToSummaryDto(SummaryEntity summaryEntity){
        if(summaryEntity== null){
           return null;
        }
        return SummaryDto.builder()
                .id(summaryEntity.getId())
                .summary(summaryEntity.getSummary())
                .build();
    }



}
