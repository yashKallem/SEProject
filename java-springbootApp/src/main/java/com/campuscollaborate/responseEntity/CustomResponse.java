package com.campuscollaborate.responseEntity;

import com.campuscollaborate.entity.ProjectEntity;
import com.campuscollaborate.entity.UserEntity;

public class CustomResponse {
    private String message;

    public CustomResponse(String message, ProjectEntity project, UserEntity user) {
        this.message = message;
        this.project = project;
        this.user = user;
    }

    private ProjectEntity project;
    private UserEntity user;
}
