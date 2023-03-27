package com.campuscollaborate.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class UserDto extends ResponseDto{
    private Long userId;
    private String givenName;
    private String lastName;
    private String email;
    private String phone;
    private String role;
    private List<ProjectDto> projects;
    private List<EducationDto> educationHistory;
    private List<WorkDto> workHistory;
    private List<SkillDto> skills;
    private List<NetworkDto> network;
    private SummaryDto summary;
    private String username;
    private  String educationLevel;
    private  String courseOfStudy;
    private Date dob;


}
