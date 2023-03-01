package com.campuscollaborate.requestEntity;

import com.campuscollaborate.utility.Role;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RegisterRequest {
    private String givenName;
    private  String lastName;
    private Date dob;
    private  String educationLevel;
    private  String courseOfStudy;
    private  String email;
    private String password;
    private  String phone;
    @Enumerated(EnumType.STRING)
    private  Role role;
}
