package com.zerock.mallapi.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import com.zerock.mallapi.dto.geminiChatDTO;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class GeminiAPIController {

    @Value("${gemini.api.key}") // 환경 변수에서 API 키 가져오기
    private String googleApiKey;
    private final RestTemplate restTemplate = new RestTemplate();
    @PostMapping("/geminichat")
    public ResponseEntity<?> generateResponse(@RequestBody geminiChatDTO geminiChatDTO) {
        String prompt = geminiChatDTO.getText();

        try {
            // Google Generative AI API 호출
            String googleApiUrl = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro-latest:generateContent?key=" + googleApiKey; // 실제 엔드포인트 입력

            // HTTP 요청 헤더 설정
            HttpHeaders headers = new HttpHeaders();
            headers.set("Content-Type", "application/json");

            // 요청 바디 구성
            Map<String, Object> requestBody = new HashMap<>();
             Map<String, Object> content = new HashMap<>();
             Map<String, Object> parts = new HashMap<>();
             parts.put("text", prompt);
            content.put("parts", new Object[]{parts});
            requestBody.put("contents", new Object[]{content});

            HttpEntity<Map<String, Object>> entity = new HttpEntity<>(requestBody, headers);

            // RestTemplate로 API 호출
            ResponseEntity<String> response = restTemplate.exchange(googleApiUrl, HttpMethod.POST, entity, String.class);
            System.out.print(response.getBody());
            return ResponseEntity.ok(response.getBody());
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Google API 호출 실패");
        }
    }
}
