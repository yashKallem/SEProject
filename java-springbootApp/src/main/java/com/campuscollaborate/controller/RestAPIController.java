package com.campuscollaborate.controller;


import io.jsonwebtoken.io.IOException;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
@CrossOrigin("http://localhost:3000")
@RequiredArgsConstructor
public class RestAPIController {
    @GetMapping("/api/index")
    public ResponseEntity<byte[]> getRestIndex() throws IOException, java.io.IOException {
        Resource resource = new ClassPathResource("/static/index.html");
        byte[] fileContent = FileCopyUtils.copyToByteArray(resource.getInputStream());
        return ResponseEntity.ok().body(fileContent);
    }
    @GetMapping("/api/commands")
    public ResponseEntity<byte[]> showCommands() throws IOException, java.io.IOException {
        Resource resource = new ClassPathResource("/static/helpfulcommands.html");
        byte[] fileContent = FileCopyUtils.copyToByteArray(resource.getInputStream());
        return ResponseEntity.ok().body(fileContent);
    }
    @GetMapping("/api/authentication")
    public ResponseEntity<byte[]> showAuthenticationApi() throws IOException, java.io.IOException {
        Resource resource = new ClassPathResource("/static/authentication.html");
        byte[] fileContent = FileCopyUtils.copyToByteArray(resource.getInputStream());
        return ResponseEntity.ok().body(fileContent);
    }
}

