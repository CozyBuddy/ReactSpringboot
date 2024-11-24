package com.zerock.mallapi.controller;

import java.time.LocalDateTime;
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

import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.zerock.mallapi.domain.ChatRecord;
import com.zerock.mallapi.dto.geminiChatDTO;
import com.zerock.mallapi.repository.ChatRepository;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class GeminiAPIController {

    @Value("${gemini.api.key}") // 환경 변수에서 API 키 가져오기
    private String googleApiKey;
    private final RestTemplate restTemplate = new RestTemplate();
    private final ChatRepository chatRepository ;
    @PostMapping("/geminichat")
    public ResponseEntity<?> generateResponse(@RequestBody geminiChatDTO geminiChatDTO) {
        String prompt = geminiChatDTO.getText();
        String email = geminiChatDTO.getEmail();
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
            LocalDateTime dateTime = LocalDateTime.now();
            ChatRecord cr = new ChatRecord().builder().email(email).message(prompt).time(dateTime).build();
            chatRepository.save(cr);
            JsonElement jsonElement = JsonParser.parseString(response.getBody());
            JsonObject jsonObject = jsonElement.getAsJsonObject();
            JsonArray candidates = jsonObject.getAsJsonArray("candidates");
            JsonObject content2 = candidates.get(0).getAsJsonObject().getAsJsonObject("content");
            JsonArray parts2 = content2.getAsJsonArray("parts");
    
            // 첫 번째 parts 객체의 "text" 값 추출
            String text = parts2.get(0).getAsJsonObject().get("text").getAsString();
            LocalDateTime dateTime2 = LocalDateTime.now();
            ChatRecord cr2 = new ChatRecord().builder().email("AI").message(text).time(dateTime2).build();
            chatRepository.save(cr2);
            return ResponseEntity.ok(response.getBody());
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Google API 호출 실패");
        }
    }
}
