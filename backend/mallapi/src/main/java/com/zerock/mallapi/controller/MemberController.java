package com.zerock.mallapi.controller;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.zerock.mallapi.dto.MemberDTO;
import com.zerock.mallapi.service.MemberService;

import lombok.Data;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

@RestController
@Log4j2
@Data
@RequiredArgsConstructor
public class MemberController {
    
    
    private final MemberService memberservice ; 

    @PostMapping("/api/member/join")
    public String joinMember(@RequestBody MemberDTO memberDTO ){

         System.out.print(memberDTO);
         memberservice.joinMember(memberDTO);
      
        return "성공";
    }
}
