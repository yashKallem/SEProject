package com.campuscollaborate.controller;

import com.campuscollaborate.dto.EducationDto;
import com.campuscollaborate.helper.UserMessage;
import com.campuscollaborate.service.AuthenticationService;
import com.campuscollaborate.service.EducationService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/education")
@CrossOrigin(origins = "http://localhost:3000")
@RequiredArgsConstructor
public class EducationController {

    @Autowired
    public AuthenticationService authenticationService;

    @Autowired
    public EducationService educationService;

    @PostMapping("/add")
    public ResponseEntity<EducationDto> addInstitution(@RequestHeader("Authorization") String bearerToken, @RequestBody EducationDto educationDto) {
        try{
            boolean isValid = authenticationService.checkIfTheUserIsAccessingHisOwnAccount(bearerToken, educationDto.getEmail());
            if(!isValid){
                educationDto.setErrorMessage(UserMessage.TOKEN_MISMATCH);
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(educationDto);
            }
            EducationDto dto = educationService.add(educationDto);
            if(dto==null){
                educationDto.setErrorMessage(UserMessage.INSTITUTE_ADD_FAILED);
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(educationDto);
            }
            else{
                dto.setMessage(UserMessage.INSTITUTE_ADDED);
                return ResponseEntity.status(HttpStatus.OK).body(dto);
            }
        }
        catch (Exception ex){
            educationDto.setErrorMessage(UserMessage.INSTITUTE_ADD_FAILED +" REASON: "+ ex.getMessage());
            return ResponseEntity.status(HttpStatus.OK).body(educationDto);
        }
    }
    @DeleteMapping("/delete")
    public ResponseEntity<EducationDto> deleteInstitution(@RequestHeader("Authorization") String bearerToken, @RequestBody EducationDto educationDto) {
        EducationDto dto = new EducationDto();
        dto.setId(educationDto.getId());
        try {
            boolean isValid = authenticationService.checkIfTheUserIsAccessingHisOwnAccount(bearerToken, educationDto.getEmail());
            if (!isValid) {
                educationDto.setErrorMessage(UserMessage.TOKEN_MISMATCH);
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(dto);
            }
            boolean isDeleted = educationService.delete(educationDto);
            if (isDeleted) {
                dto.setMessage(UserMessage.INSTITUTE_DELETED);
            } else {
                dto.setMessage(UserMessage.INSTITUTE_DELETE_FAILED);
            }
            return ResponseEntity.status(HttpStatus.OK).body(dto);
        } catch (Exception ex) {
            educationDto.setErrorMessage(UserMessage.INSTITUTE_DELETE_FAILED + " REASON: " + ex.getMessage());
            return ResponseEntity.status(HttpStatus.OK).body(educationDto);
        }
    }

    @PutMapping("/update")
    public ResponseEntity<EducationDto> updateInstitution(@RequestHeader("Authorization") String bearerToken, @RequestBody EducationDto educationDto) {
        EducationDto dto = new EducationDto();
        dto.setId(educationDto.getId());
        try {
            boolean isValid = authenticationService.checkIfTheUserIsAccessingHisOwnAccount(bearerToken, educationDto.getEmail());
            if (!isValid) {
                educationDto.setErrorMessage(UserMessage.TOKEN_MISMATCH);
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(dto);
            }
            dto = educationService.update(educationDto);
            if (dto == null) {
                educationDto.setErrorMessage(UserMessage.INSTITUTE_UPDATE_FAILED);
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(educationDto);
            } else {
                dto.setMessage(UserMessage.INSTITUTE_UPDATED);
                return ResponseEntity.status(HttpStatus.OK).body(dto);
            }

        } catch (Exception ex) {
            educationDto.setErrorMessage(UserMessage.INSTITUTE_UPDATE_FAILED + " REASON: " + ex.getMessage());
            return ResponseEntity.status(HttpStatus.OK).body(educationDto);
        }
    }
}
