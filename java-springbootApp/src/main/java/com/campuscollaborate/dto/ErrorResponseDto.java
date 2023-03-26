package com.campuscollaborate.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@NoArgsConstructor
@AllArgsConstructor
public class ErrorResponseDto {
 private String errorMessage;
 private String message;
}
