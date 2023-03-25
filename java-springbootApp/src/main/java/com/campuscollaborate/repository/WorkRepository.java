package com.campuscollaborate.repository;

import com.campuscollaborate.entity.WorkExperienceEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WorkRepository extends JpaRepository<WorkExperienceEntity, Long> {
}