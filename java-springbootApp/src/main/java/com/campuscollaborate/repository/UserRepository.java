package com.campuscollaborate.repository;

import com.campuscollaborate.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<UserEntity,Long> {

    Optional<UserEntity> findByEmail(String email);
    List<UserEntity> findByProjectsProjectName(String projectName);
    Optional<UserEntity> findByUserId(Long userId);
 //   List<ProjectEntity> findByUserEmail(String email);

   // List<UserEntity> findByProjectIdsContaining(Long projectId);

   // List<UserEntity> findByProjectsProjectId(Long projectId);

    boolean deleteByEmail(String userEmail);
}
