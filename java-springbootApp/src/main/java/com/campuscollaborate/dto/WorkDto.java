package com.campuscollaborate.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class WorkDto extends ResponseDto{

    private Long id;

    private String workTitle;

    private String companyName;

    private String workIndustry;
    private Date fromDate;

    private Date tillDate;

    private String description;
    private UserDto userDto;
    private String email;
}
