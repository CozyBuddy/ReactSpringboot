package com.zerock.mallapi.service;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Optional;

import org.hibernate.action.internal.EntityActionVetoException;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponents;
import org.springframework.web.util.UriComponentsBuilder;

import com.zerock.mallapi.domain.Member;
import com.zerock.mallapi.domain.MemberRole;
import com.zerock.mallapi.dto.MemberDTO;
import com.zerock.mallapi.dto.MemberModifyDTO;
import com.zerock.mallapi.repository.MemberRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

@Service
@RequiredArgsConstructor
@Log4j2
public class MemberServiceImpl implements MemberService{
    private final MemberRepository memberRepository ;
    private final PasswordEncoder passwordEncoder ;
    @Override
    public MemberDTO getKakaoMember(String accessToken) {
        String email = getEmailFromKakaoAccessToken(accessToken) ;
        log.info("email:" + email);
        Optional<Member> result = memberRepository.findById(email);

        if (result.isPresent()) {
            MemberDTO  memberDTO = entityToDTO(result.get());

            return memberDTO;
        } 
        Member socialMember = makeSocialMember(email);
        memberRepository.save(socialMember) ;
        MemberDTO memberDTO = entityToDTO(socialMember);
        return memberDTO ;
        
    }

    private String getEmailFromKakaoAccessToken(String accessToken) {
        String kakaoGetUserURl = "https://kapi.kakao.com/v2/user/me" ;

        if (accessToken == null) {
            throw new RuntimeException("Access Token is null") ;
        }

        RestTemplate restTemplate = new RestTemplate() ;

        HttpHeaders headers = new HttpHeaders();
        // Bearer 뒤에 띄어쓰기
        headers.add("Authorization" , "Bearer " + accessToken) ;
        headers.add("Content-Type" ,"application/x-www-form-urlencoded");
        HttpEntity<String> entity = new HttpEntity<>(headers) ;

        UriComponents uriBuilder = UriComponentsBuilder
        .fromHttpUrl(kakaoGetUserURl).build();

        ResponseEntity<LinkedHashMap> response = restTemplate.exchange(uriBuilder.toString(), HttpMethod.GET ,
        entity , LinkedHashMap.class) ;

        log.info(response) ;

        LinkedHashMap<String, LinkedHashMap> bodyMap = response.getBody() ;

        log.info("------------------------");
        log.info(bodyMap);

        LinkedHashMap<String,String> kakaoAccount = bodyMap.get("kakao_account");

        log.info("kakaoAccount :" + kakaoAccount);
        return kakaoAccount.get("email");
    }

    private String makeTempPassword() {
        StringBuffer buffer = new StringBuffer();

        for(int i =0 ; i < 10 ; i++) {
            buffer.append((char)((int)(Math.random()*55) + 65)) ;
        }
        return buffer.toString() ;
    }

    private Member makeSocialMember(String email) {
        String tempPassword = makeTempPassword() ;

        log.info("tempPassword:" + tempPassword);

        String nickname = "소셜회원" ;

        Member member = Member.builder()
        .email(email)
        .pw(passwordEncoder.encode(tempPassword))
        .nickname(nickname)
        .social(true)
        .build();

        member.addRole(MemberRole.USER);

        return member ;
    }

    @Override
    public void modifyMember(MemberModifyDTO memberModifyDTO) {
        Optional<Member> result = memberRepository.findById(memberModifyDTO.getEmail());

        Member member = result.orElseThrow() ;

        member.changePw(passwordEncoder.encode(memberModifyDTO.getPw()));
        member.changeSocial(false);
        member.changeNickname(memberModifyDTO.getNickname());

        memberRepository.save(member);
    }

    @Override
    public void joinMember(MemberDTO memberDTO) {
        Member member = new Member();
        member.setEmail(memberDTO.getEmail());
        member.setPw(passwordEncoder.encode(memberDTO.getPw()));
        member.setNickname(memberDTO.getNickname());
        member.setSocial(false);
        member.addRole(MemberRole.USER);
        memberRepository.save(member);
        
    }

    
}
