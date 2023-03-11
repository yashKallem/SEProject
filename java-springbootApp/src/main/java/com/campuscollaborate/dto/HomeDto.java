package com.campuscollaborate.dto;

import com.campuscollaborate.entity.UserEntity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class HomeDto {

    private List<UserEntity> users;

}
