package com.campuscollaborate.dto;

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
public class UserDto {
    private Long userId;
    private String givenName;
    private String lastName;
    private String email;
    private String phone;
    private String role;
    private List<ProjectDto> projects;
    private String username;
    private  String educationLevel;
    private  String courseOfStudy;
    private Date dob;


}
