package com.campuscollaborate.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class EducationDto extends ResponseDto {

    private Long id;
    private String instituteName;

    private Integer startYear;

    private Integer endYear;

    private String degree;

    private String department;
}
