package com.campuscollaborate.controller;

import com.campuscollaborate.dto.WorkDto;
import com.campuscollaborate.helper.UserMessage;
import com.campuscollaborate.service.AuthenticationService;
import com.campuscollaborate.service.WorkService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/work")
@CrossOrigin(origins = "http://localhost:3000")
@RequiredArgsConstructor
public class WorkController {

    @Autowired
    public AuthenticationService authenticationService;

    @Autowired
    public WorkService workService;

    @PostMapping("/add")
    public ResponseEntity<WorkDto> add(@RequestHeader("Authorization") String bearerToken, @RequestBody WorkDto workDto) {
        try{
            boolean isValid = authenticationService.checkIfTheUserIsAccessingHisOwnAccount(bearerToken, workDto.getEmail());
            if(!isValid){
                workDto.setErrorMessage(UserMessage.TOKEN_MISMATCH);
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(workDto);
            }
            WorkDto dto = workService.add(workDto);
            if(dto==null){
                workDto.setErrorMessage(UserMessage.WORK_ADD_FAILED);
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(workDto);
            }
            else{
                dto.setMessage(UserMessage.WORK_ADDED);
                return ResponseEntity.status(HttpStatus.OK).body(dto);
            }
        }
        catch (Exception ex){
            workDto.setErrorMessage(UserMessage.WORK_ADD_FAILED +" REASON: "+ ex.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(workDto);
        }
    }



    @DeleteMapping("/delete")
    public ResponseEntity<WorkDto> delete(@RequestHeader("Authorization") String bearerToken, @RequestBody WorkDto workDto) {
        WorkDto dto = new WorkDto();
        dto.setId(workDto.getId());
        try {
            boolean isValid = authenticationService.checkIfTheUserIsAccessingHisOwnAccount(bearerToken, workDto.getEmail());
            if (!isValid) {
                workDto.setErrorMessage(UserMessage.TOKEN_MISMATCH);
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(dto);
            }
            boolean isDeleted = workService.delete(workDto);
            if(isDeleted){
                dto.setMessage(UserMessage.WORK_DELETED);
            }
            else {
                dto.setMessage(UserMessage.WORK_DELETE_FAILED);
            }
            return ResponseEntity.status(HttpStatus.OK).body(dto);
        } catch (Exception ex) {
            dto.setErrorMessage(UserMessage.WORK_DELETE_FAILED +" REASON: "+ex.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(dto);
        }
    }

    @PutMapping("/update")
    public ResponseEntity<WorkDto> update(@RequestHeader("Authorization") String bearerToken, @RequestBody WorkDto workDto) {
        WorkDto dto = new WorkDto();
        dto.setId(workDto.getId());
        try {
            boolean isValid = authenticationService.checkIfTheUserIsAccessingHisOwnAccount(bearerToken, workDto.getEmail());
            if (!isValid) {
                workDto.setErrorMessage(UserMessage.TOKEN_MISMATCH);
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(dto);
            }
            dto = workService.update(workDto);
            if (dto == null) {
                workDto.setErrorMessage(UserMessage.WORK_UPDATE_FAILED);
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(workDto);
            } else {
                dto.setMessage(UserMessage.WORK_UPDATED);
                return ResponseEntity.status(HttpStatus.OK).body(dto);
            }

        } catch (Exception ex) {
            workDto.setErrorMessage(UserMessage.WORK_UPDATE_FAILED + " REASON: " + ex.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(workDto);
        }
    }
}
