package com.campuscollaborate.entity;

import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "projects")
public class ProjectEntity {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "project_name", nullable = false)
    private String projectName;

    @Column(name = "project_description", nullable = false)
    private String projectDescription;

    @Column(name = "project_role", nullable = false)
    private String projectRole;

    @Column(name = "location", nullable = false)
    private String location;

    @Column(name = "published_at", nullable = false)
    private Date publishedAt;

    @Column(name = "job_description", nullable = false)
    private String jobDescription;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "published_by", nullable = false)
    private UserEntity publishedBy;

    @Column(name = "deadline", nullable = false)
    private Date deadline;

//
//    @ManyToOne
//    @JoinColumn(name = "user_id")
//    private UserEntity user;

    // Constructor, Getter and Setter methods

}
