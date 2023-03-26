package com.campuscollaborate.repository;

import com.campuscollaborate.entity.ProjectEntity;
import com.campuscollaborate.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;


@Repository
public interface ProjectRepository extends JpaRepository<ProjectEntity, Long> {

    Optional<ProjectEntity> findById(Long id);

    ProjectEntity findByProjectName(String projectName);
    List<ProjectEntity> findByPublishedBy(Optional<UserEntity> user);

    void deleteById(Long id);
    List<ProjectEntity> findByLocation(String location);

    List<ProjectEntity> findByPublishedByUserIdOrPublishedByEmail(Long userId, String email);



}