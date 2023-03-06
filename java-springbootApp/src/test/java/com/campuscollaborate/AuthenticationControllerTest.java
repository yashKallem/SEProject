
package com.campuscollaborate;

import com.campuscollaborate.controller.AuthenticationController;
import com.campuscollaborate.requestEntity.AuthenticationRequest;
import com.campuscollaborate.requestEntity.RegisterRequest;
import com.campuscollaborate.responseEntity.AuthenticationResponse;
import com.campuscollaborate.service.AuthenticationService;
import com.campuscollaborate.utility.Role;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.boot.test.autoconfigure.restdocs.AutoConfigureRestDocs;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.restdocs.RestDocumentationContextProvider;
import org.springframework.restdocs.RestDocumentationExtension;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import java.util.Date;
import java.util.Random;

import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.documentationConfiguration;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@Slf4j
@SpringBootTest
@AutoConfigureRestDocs(outputDir = "target/generated-snippets")
@AutoConfigureMockMvc
@ExtendWith({RestDocumentationExtension.class, SpringExtension.class})
public class AuthenticationControllerTest {

    private MockMvc mockMvc;

    private AuthenticationService authenticationService;

    private AuthenticationController authenticationController;

    private ObjectMapper objectMapper;
    public final String URL_TEMPLATE = "/api/v1/auth/";

    @BeforeEach
    void setUp(WebApplicationContext webApplicationContext,
               RestDocumentationContextProvider restDocumentation) throws Exception {
        this.mockMvc = MockMvcBuilders.webAppContextSetup(webApplicationContext)
                .apply(documentationConfiguration(restDocumentation))
                .alwaysDo(document("{class-name}/{method-name}",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint())))
                .build();
        objectMapper = new ObjectMapper();
        authenticationService = mock(AuthenticationService.class);
        authenticationController = new AuthenticationController(authenticationService);
    }

    @Test
    void testAddUser() throws Exception {
        Random random = new Random();
        RegisterRequest registerRequest = RegisterRequest
                .builder()
                .email("s" + random.nextInt(100) + 1 + "@wiu.edu")
                .dob(new Date("02/01/1994"))
                .phone("9876543210")
                .role(Role.USER)
                .courseOfStudy("CSE")
                .educationLevel("masters")
                .password("password")
                .givenName("shams")
                .lastName("mohammad")
                .build();
        String body = objectMapper.writeValueAsString(registerRequest);
        ResultActions resultActions;
        resultActions = mockMvc.perform(post(URL_TEMPLATE+"register")
                        .content(body)
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andDo(print());
    }

    @Test
    void testAlreadyAddedUser() throws Exception {
        Random random = new Random();
        RegisterRequest registerRequest = RegisterRequest
                .builder()
                .email("shamsi@wiu.edu")
                .dob(new Date("02/01/1994"))
                .phone("9876543210")
                .role(Role.USER)
                .courseOfStudy("CSE")
                .educationLevel("masters")
                .password("password")
                .givenName("shams")
                .lastName("mohammad")
                .build();
        String body = objectMapper.writeValueAsString(registerRequest);
        ResultActions resultActions;
        resultActions = mockMvc.perform(post(URL_TEMPLATE+"register")
                        .content(body)
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isConflict())
                .andDo(print());
    }

    @Test
    void testLoginWithCorrectPassword() throws Exception {
        AuthenticationRequest authenticationRequest = AuthenticationRequest
                .builder()
                .email("shamsi@wiu.edu")
                .password("password")
                .build();
        String body = objectMapper.writeValueAsString(authenticationRequest);
       ResultActions resultActions= mockMvc.perform(post(URL_TEMPLATE+"authenticate")
                .contentType(MediaType.APPLICATION_JSON)
                .content(body))
                .andExpect(status().isOk())
                .andDo(print());
    }
    @Test
    void testLoginWithWrongPassword() throws Exception {
        AuthenticationRequest authenticationRequest = AuthenticationRequest
                .builder()
                .email("shamsi@Wiu.edu")
                .password("password123")
                .build();
        String body = objectMapper.writeValueAsString(authenticationRequest);
        mockMvc.perform(post(URL_TEMPLATE+"authenticate")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(body))
                .andExpect(status().isUnauthorized())
                .andDo(print());
    }
    @Test
    void testLoginWithNonExistingUser() throws Exception {
        AuthenticationRequest authenticationRequest = AuthenticationRequest
                .builder()
                .email("shamsi123@Wiu.edu")
                .password("password")
                .build();
        String body = objectMapper.writeValueAsString(authenticationRequest);
        mockMvc.perform(post(URL_TEMPLATE+"authenticate")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(body))
                .andExpect(status().isUnauthorized())
                .andDo(print());
    }
}