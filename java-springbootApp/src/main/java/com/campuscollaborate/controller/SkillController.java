package com.campuscollaborate.controller;

import com.campuscollaborate.dto.SkillDto;
import com.campuscollaborate.helper.UserMessage;
import com.campuscollaborate.service.AuthenticationService;
import com.campuscollaborate.service.SkillService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/skills")
@CrossOrigin(origins = "http://localhost:3000")
@RequiredArgsConstructor
public class SkillController {

    @Autowired
    public AuthenticationService authenticationService;
    @Autowired
    public SkillService skillService;

    @PostMapping("/add")
    public ResponseEntity<SkillDto> add(@RequestHeader("Authorization") String bearerToken,@RequestBody SkillDto skillDto)
    {

        try{
            boolean isValid = authenticationService.checkIfTheUserIsAccessingHisOwnAccount(bearerToken, skillDto.getEmail());
            if(!isValid){
                skillDto.setErrorMessage(UserMessage.TOKEN_MISMATCH);
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(skillDto);
            }
            SkillDto dto = skillService.add(skillDto);
            if(dto==null){
                skillDto.setErrorMessage(UserMessage.SKILL_ADDED_FAILED);
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(skillDto);
            }
            else{
                dto.setMessage(UserMessage.SKILL_ADDED);
                return ResponseEntity.status(HttpStatus.OK).body(dto);
            }
        }
        catch (Exception ex){
            skillDto.setErrorMessage(UserMessage.SKILL_ADDED_FAILED+" REASON "+ ex.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(skillDto);
        }
    }
    @DeleteMapping("/delete")
    public ResponseEntity<SkillDto> delete(@RequestHeader("Authorization") String bearerToken, @RequestBody SkillDto skillDto) {
        SkillDto dto = new SkillDto();
        dto.setId(skillDto.getId());
        try {
            boolean isValid = authenticationService.checkIfTheUserIsAccessingHisOwnAccount(bearerToken, skillDto.getEmail());
            if (!isValid) {
                skillDto.setErrorMessage(UserMessage.TOKEN_MISMATCH);
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(dto);
            }
            boolean isDeleted = skillService.delete(skillDto);
            if(isDeleted){
                dto.setMessage(UserMessage.SKILL_DELETED);
            }
            else {
                dto.setMessage(UserMessage.SKILL_DELETE_FAILED);
            }
            return ResponseEntity.status(HttpStatus.OK).body(dto);
        } catch (Exception ex) {

            dto.setErrorMessage(UserMessage.SKILL_DELETE_FAILED +" REASON: "+ex.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(dto);
        }
    }
}
