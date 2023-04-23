package com.campuscollaborate.service;

import com.campuscollaborate.dto.UserDto;
import com.campuscollaborate.entity.UserEntity;
import com.campuscollaborate.helper.Mapper;
import com.campuscollaborate.helper.UserMessage;
import com.campuscollaborate.repository.ProjectRepository;
import com.campuscollaborate.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
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

    public UserDto updateUserAboutSection(UserDto userDto) {
        Optional<UserEntity> userEntity = userRepository.findByEmail(userDto.getEmail());
        if (userEntity.isPresent()) {
            userEntity.get().setGivenName(userDto.getGivenName());
            userEntity.get().setLastName(userDto.getLastName());
            userEntity.get().setCourseOfStudy(userDto.getCourseOfStudy());
            userEntity.get().setEducationLevel(userDto.getEducationLevel());
            var user = userRepository.save(userEntity.get());
                if (userEntity.get().getGivenName().equals(userDto.getGivenName())
                        && userEntity.get().getLastName().equals(userDto.getLastName()) && userEntity.get().getEducationLevel().equals(userDto.getEducationLevel())
                        && userEntity.get().getCourseOfStudy().equals(userDto.getCourseOfStudy())) {
                    userDto.setMessage(UserMessage.ABOUT_UPDATED);
                    return userDto;
                } else {
                    userDto.setErrorMessage(UserMessage.ABOUT_UPDATED_FAILED);
                    return userDto;
                }
            }
        else{
            userDto.setErrorMessage(UserMessage.USER_NOT_FOUND);
            return userDto;
        }

    }

    public UserDto updateContactSection(UserDto userDto) {
        Optional<UserEntity> userEntity = userRepository.findByEmail(userDto.getEmail());
        if (userEntity.isPresent()) {
            userEntity.get().setPhone(userDto.getPhone());
            var user = userRepository.save(userEntity.get());
            if (user.getPhone().equals(userDto.getPhone())) {
                userDto.setMessage(UserMessage.CONTACT_UPDATED);
                return userDto;
            } else {
                userDto.setErrorMessage(UserMessage.CONTACT_UPDATE_FAILED);
                return userDto;
            }

        }
        else{
            userDto.setErrorMessage(UserMessage.USER_NOT_FOUND);
            return userDto;
        }
    }

    public List<UserDto> findByFirstnameAndLastname(String givenName, String lastName) {
        List<UserEntity> users =  userRepository.findByGivenNameIgnoreCaseContainingAndLastNameIgnoreCaseContaining(givenName,lastName);
        List<UserDto> userDtos = new ArrayList<>();
        for (UserEntity user : users) {
            userDtos.add(Mapper.userEntityToUserDTO(user));
        }
        return  userDtos;
    }

    public List<UserDto> findByFirstname(String givenName) {
        List<UserEntity> users =  userRepository.findByGivenNameIgnoreCase(givenName);
        List<UserDto> userDtos = new ArrayList<>();
        for (UserEntity user : users) {
            userDtos.add(Mapper.userEntityToUserDTO(user));
        }
        return  userDtos;
    }

    public List<UserDto> findByLastname(String lastName) {
        List<UserEntity> users =  userRepository.findByLastNameIgnoreCase(lastName);
        List<UserDto> userDtos = new ArrayList<>();
        for (UserEntity user : users) {
            userDtos.add(Mapper.userEntityToUserDTO(user));
        }
        return  userDtos;
    }
}
