package com.campuscollaborate.service;

import com.campuscollaborate.dto.UserDto;
import com.campuscollaborate.entity.UserEntity;
import com.campuscollaborate.helper.Mapper;
import com.campuscollaborate.repository.ProjectRepository;
import com.campuscollaborate.repository.UserRepository;
import com.campuscollaborate.responseEntity.AuthenticationResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private ProjectRepository projectRepository;

    public List<UserDto> getAllUsers() {
        List<UserEntity> users = userRepository.findAll();
        List<UserDto> usersDto = new ArrayList<>();
        for (UserEntity user : users) {
            usersDto.add(Mapper.userEntityToUserDTO(user));
        }
        return usersDto;
    }

    public List<UserDto> getOnlyUsers() {
        List<UserEntity> users = userRepository.findAll();
        List<UserDto> usersDto = new ArrayList<>();
        for (UserEntity user : users) {
            usersDto.add(Mapper.getOnlyUserDTO(user));
        }
        return usersDto;
    }

    public UserDto getUserById(Long userId) {
        Optional<UserEntity> user = userRepository.findByUserId(userId);
        UserDto userDTO = null;
        if (user != null && user.isPresent()) {
            userDTO = Mapper.userEntityToUserDTOOOptional(user);
        }
        return userDTO;


    }

    public UserDto getUserAndHisProjectsById(Long userId) {
        Optional<UserEntity> user = userRepository.findByUserId(userId);
        UserDto userDTO = null;
        if (user != null && user.isPresent()) {
            userDTO = Mapper.getUserEntityToUserDTOOOptionalForProjects(user);
        }
        return userDTO;


    }

    public UserDto getUserByEmail(String email) {
        Optional<UserEntity> user = userRepository.findByEmail(email);
        UserDto userDTO = null;
        if (user != null && user.isPresent()) {
            userDTO = Mapper.userEntityToUserDTOOOptional(user);
        }
        return userDTO;
    }

    public UserEntity addUser(UserEntity user) {
        return userRepository.save(user);
    }

    public UserEntity updateUser(UserEntity userEntity) {
        Optional<UserEntity> updatedUser = userRepository.findByEmail(userEntity.getEmail());
        if (updatedUser.isPresent()) {
            UserEntity user = updatedUser.get();
            user.setRole(userEntity.getRole());
            user.setCourseOfStudy(userEntity.getCourseOfStudy());
            user.setEducationLevel(userEntity.getEducationLevel());
            user.setPhone(userEntity.getPhone());
            user.setDob(userEntity.getDob());
            user.setLastName(userEntity.getLastName());
            user.setGivenName(userEntity.getGivenName());
            return userRepository.save(user);
        } else {
            return null;
        }
    }

    public Boolean deleteUser(String userEmail) {
        Optional<UserEntity> userEntity = userRepository.findByEmail(userEmail);
        if (userEntity.isPresent()) {
            return userRepository.deleteByEmail(userEmail);
        } else {
            return false;
        }
    }
    public AuthenticationResponse updateUserAboutSection(UserDto userDto) {
        Optional<UserEntity> userEntity = userRepository.findByEmail(userDto.getEmail());
        if (userEntity.isPresent()) {
            UserEntity user = userEntity.get();
            user.setGivenName(userDto.getGivenName());
            user.setLastName(userDto.getLastName());
            user.setCourseOfStudy(userDto.getCourseOfStudy());
            user.setEducationLevel(userDto.getEducationLevel());
            userEntity = Optional.of(userRepository.save(user));
            if(userEntity.isPresent()){
               if(userEntity.get().getGivenName().equals(userDto.getGivenName())
                   && userEntity.get().getLastName().equals(userDto.getLastName()) && userEntity.get().getEducationLevel().equals(userDto.getEducationLevel())
                       && userEntity.get().getCourseOfStudy().equals(userDto.getCourseOfStudy()))
               {
                 return   AuthenticationResponse.builder().httpStatus(HttpStatus.OK).build();
               }
               else {
                 return   AuthenticationResponse.builder().httpStatus(HttpStatus.EXPECTATION_FAILED).build();
               }
            }
        }
        return  AuthenticationResponse.builder().httpStatus(HttpStatus.NOT_FOUND).build();
    }

    public AuthenticationResponse updateContactSection(UserDto userDto) {
        Optional<UserEntity> userEntity = userRepository.findByEmail(userDto.getEmail());
        if (userEntity.isPresent()) {
            UserEntity user = userEntity.get();
           user.setPhone(userDto.getPhone());
            if(userEntity.isPresent()){
               if(userEntity.get().getPhone().equals(userDto.getPhone())) {
                   return   AuthenticationResponse.builder().httpStatus(HttpStatus.OK).build();
               }
               else {
                   return   AuthenticationResponse.builder().httpStatus(HttpStatus.EXPECTATION_FAILED).build();
               }
            }

        }
        return  AuthenticationResponse.builder().httpStatus(HttpStatus.NOT_FOUND).build();
    }
}
