package com.campuscollaborate.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class EducationDto extends ResponseDto {

    private Long id;
    private String instituteName;

    private Integer startYear;

    private Integer endYear;

    private String degree;

    private String department;
    private UserDto userDto;
    private String email;
}
