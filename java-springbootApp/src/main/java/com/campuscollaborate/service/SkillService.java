package com.campuscollaborate.service;

import com.campuscollaborate.dto.ProjectDto;
import com.campuscollaborate.dto.SkillDto;
import com.campuscollaborate.entity.SkillEntity;
import com.campuscollaborate.entity.UserEntity;
import com.campuscollaborate.helper.Mapper;
import com.campuscollaborate.repository.SkillRepository;
import com.campuscollaborate.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.Optional;

@Service
public class SkillService {

    @Autowired
    SkillRepository skillRepository;
    @Autowired
    UserRepository userRepository;


    public SkillDto addSkill(SkillDto skillDto) {
        Optional<UserEntity> userEntity = userRepository.findByEmail(skillDto.getEmail());
        if (!userEntity.isEmpty()) {
            SkillEntity skillEntity = new SkillEntity();
            skillEntity.setSkill(skillDto.getSkill());
            skillEntity.setUser(userEntity.get());
            SkillEntity skill = skillRepository.save(skillEntity);
            return Mapper.skillEntityToSkillDto(skill);
        } else {
            return null;
        }

    }

    public boolean deleteUserSkill(SkillDto skillDto) {
        skillRepository.deleteById(skillDto.getId());
        if (skillRepository.findById(skillDto.getId()).isEmpty()) {
            return true;
        } else {
            return false;
        }
    }
}
