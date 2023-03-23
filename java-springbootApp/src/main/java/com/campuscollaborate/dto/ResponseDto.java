package com.campuscollaborate.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@NoArgsConstructor
@AllArgsConstructor

public class ResponseDto {
 private String errorMessage;
 private String message;

}
