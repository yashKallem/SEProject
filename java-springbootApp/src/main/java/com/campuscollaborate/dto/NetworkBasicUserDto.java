package com.campuscollaborate.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class NetworkBasicUserDto {
    private Long id;
    private Long userId;
    private String givenName;
    private String lastName;
    private String email;
}
