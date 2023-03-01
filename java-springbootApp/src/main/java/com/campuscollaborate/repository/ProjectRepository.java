package com.campuscollaborate.repository;

import com.campuscollaborate.entity.ProjectEntity;
import jakarta.persistence.Tuple;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;


@Repository
public interface ProjectRepository extends JpaRepository<ProjectEntity, Integer> {

    Optional<ProjectEntity> findByProjectName(String projectName);

    List<ProjectEntity> findAllByProjectName(String projectName);

    List<ProjectEntity> findByUserUserId(Integer userId);


    @Query("SELECT p, u FROM ProjectEntity p JOIN p.user u WHERE p.projectName = ?1")
    Optional<Tuple> findByProjectNameWithUser(String projectName);
}