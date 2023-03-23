package com.campuscollaborate.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class WorkExperienceDto extends ResponseDto{

    private Long id;

    private String workTitle;

    private String companyName;

    private String workIndustry;
    private Date fromDate;

    private Date tillDate;

    private String achievements;
}
