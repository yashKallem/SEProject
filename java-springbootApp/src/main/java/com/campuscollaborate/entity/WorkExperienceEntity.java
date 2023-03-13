package com.campuscollaborate.entity;

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
@Table(name = "work_experience")
public class WorkExperienceEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private UserEntity user;

    @Column(name = "work_title")
    private String workTitle;

    @Column(name = "company_name")
    private String companyName;

    @Column(name = "work_industry")
    private String workIndustry;

    @Column(name = "from_date")
    private Date fromDate;

    @Column(name = "till_date")
    private Date tillDate;

    @Column(name = "achievements")
    private String achievements;

    // getters and setters
}