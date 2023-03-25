package com.campuscollaborate.service;

import com.campuscollaborate.dto.EducationDto;
import com.campuscollaborate.entity.EducationEntity;
import com.campuscollaborate.helper.Mapper;
import com.campuscollaborate.repository.EducationRepository;
import com.campuscollaborate.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class EducationService {

    @Autowired
    public EducationRepository educationRepository;
    @Autowired
    public UserRepository userRepository;

    public EducationDto add(EducationDto educationDto) {
        var userEntity = userRepository.findByEmail(educationDto.getEmail());
        if (userEntity.isPresent()) {
            EducationEntity educationEntity = EducationEntity.builder()
                    .instituteName(educationDto.getInstituteName())
                    .degree(educationDto.getDegree())
                    .startYear(educationDto.getStartYear())
                    .endYear(educationDto.getEndYear())
                    .department(educationDto.getDepartment())
                    .user(userEntity.get())
                    .build();
            EducationEntity education = educationRepository.save(educationEntity);
            return Mapper.educationEntityToEducationDto(education);
        } else {
            return null;
        }
    }

    public boolean delete(EducationDto educationDto) {
        educationRepository.deleteById(educationDto.getId());
        return educationRepository.findById(educationDto.getId()).isEmpty();
    }

    public EducationDto update(EducationDto educationDto) {
       var userEntity = userRepository.findByEmail(educationDto.getEmail());
        if (userEntity.isPresent()) {
            EducationEntity educationEntity = EducationEntity.builder()
                    .id(educationDto.getId()) // update
                    .instituteName(educationDto.getInstituteName())
                    .degree(educationDto.getDegree())
                    .startYear(educationDto.getStartYear())
                    .endYear(educationDto.getEndYear())
                    .department(educationDto.getDepartment())
                    .user(userEntity.get())
                    .build();
            EducationEntity education = educationRepository.save(educationEntity);
            return Mapper.educationEntityToEducationDto(education);
        } else {
            return null;
        }
    }
}
