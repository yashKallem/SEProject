package com.campuscollaborate.service;


import com.campuscollaborate.dto.WorkDto;
import com.campuscollaborate.entity.UserEntity;
import com.campuscollaborate.entity.WorkExperienceEntity;
import com.campuscollaborate.helper.Mapper;
import com.campuscollaborate.repository.UserRepository;
import com.campuscollaborate.repository.WorkRepository;
import org.jetbrains.annotations.NotNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class WorkService  {

    @Autowired
    WorkRepository repository;
    @Autowired
    UserRepository userRepository;




    public WorkDto add(@NotNull WorkDto workDto) {
        Optional<UserEntity> userEntity = userRepository.findByEmail(workDto.getEmail());
        if (userEntity.isPresent()) {
            WorkExperienceEntity work = WorkExperienceEntity.builder()
                    .companyName(workDto.getCompanyName())
                    .workIndustry(workDto.getWorkIndustry())
                    .workTitle(workDto.getWorkTitle())
                    .description(workDto.getDescription())
                    .fromDate(workDto.getFromDate())
                    .tillDate(workDto.getTillDate())
                    .user(userEntity.get())
                    .build();
            WorkExperienceEntity workExperience = repository.save(work);
            return Mapper.workExperienceEntityToWorkExperienceDto(workExperience);
        } else {
            return null;
        }
    }

    public boolean delete(@NotNull WorkDto workDto) {
        repository.deleteById(workDto.getId());
        return repository.findById(workDto.getId()).isEmpty();
    }

    public WorkDto update(@NotNull WorkDto workDto) {
        Optional<UserEntity> userEntity = userRepository.findByEmail(workDto.getEmail());
        if (userEntity.isPresent()) {
            WorkExperienceEntity work = WorkExperienceEntity.builder()
                    .id(workDto.getId())
                    .companyName(workDto.getCompanyName())
                    .workIndustry(workDto.getWorkIndustry())
                    .workTitle(workDto.getWorkTitle())
                    .description(workDto.getDescription())
                    .fromDate(workDto.getFromDate())
                    .tillDate(workDto.getTillDate())
                    .user(userEntity.get())
                    .build();
            WorkExperienceEntity workExperience = repository.save(work);
            return Mapper.workExperienceEntityToWorkExperienceDto(workExperience);
        } else {
            return null;
        }
    }

}
