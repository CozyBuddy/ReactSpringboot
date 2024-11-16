package com.zerock.mallapi.service;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.MailException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    public boolean sendEmail(String to, String subject, String text) throws Throwable {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true);

            helper.setFrom("ksunny1101@gmail.com");
            helper.setTo(to);
            helper.setSubject(subject);
            helper.setText(text, true);  // HTML 형식 이메일 전송

            mailSender.send(message);
            return true;  // 이메일 전송 성공
        } catch (MailException e) {
            e.printStackTrace();
            return false;  // 이메일 전송 실패
        }
    }
}
