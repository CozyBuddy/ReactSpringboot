package com.zerock.mallapi.controller;

import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.zerock.mallapi.dto.MailDTO;
import com.zerock.mallapi.service.EmailService;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

@RestController
@RequestMapping("/api/email")
@RequiredArgsConstructor
@Log4j2
public class EmailSendController {
    
    private final EmailService emailService;

    @PostMapping("/send")
    public ResponseEntity<String> sendEmail(@RequestBody MailDTO mailDTO){
        boolean isSend = false;
    
        String to = mailDTO.getEmail();
    
        String subject = "알림을 신청해주셔서 감사합니다.";
        String text = "생성형 AI 서비스를 출시할 예정으로 출시 예정일은 2025년 6월에 공개예정입니다."+ 
        " 추가적인 일정 변경시 이메일을 통해 안내드리겠습니다."  ;
        try {
            isSend = emailService.sendEmail(to, subject, text);
        } catch (Throwable e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
        if ( isSend) {
            return  ResponseEntity.ok("메일 발송 성공");
             
        } else {
            return  ResponseEntity.status(500).body("메일 발송 실패");
        }
    }
}
