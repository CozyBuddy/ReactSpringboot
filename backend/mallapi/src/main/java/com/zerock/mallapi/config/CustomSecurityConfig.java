package com.zerock.mallapi.config;

import java.util.Arrays;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import com.zerock.mallapi.security.filter.JWTCheckFilter;
import com.zerock.mallapi.security.handler.APILoginFailHandler;
import com.zerock.mallapi.security.handler.APILoginSuccessHandler;
import com.zerock.mallapi.security.handler.CustomAccessDeniedHandler;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

@Configuration
@Log4j2
@RequiredArgsConstructor
@EnableMethodSecurity
public class CustomSecurityConfig {

        @Bean
        public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
            log.info("--------------------security---------------");
            http.cors(httpSecurityCorsConfigurer -> {
                httpSecurityCorsConfigurer.configurationSource(corsConfigurationSource());
            });
              

            http.sessionManagement(sessionConfig -> sessionConfig.sessionCreationPolicy(SessionCreationPolicy.STATELESS));

            http.csrf(config -> config.disable());
            http.authorizeHttpRequests(auth -> 
            auth.anyRequest().permitAll() // 모든 요청에 대해 인증 없이 접근 가능
        );
            http.formLogin(config -> {
                config.loginPage("/api/member/login");
                // 자동으로 customuserdetailservice로 와서 로그인 검증
                config.successHandler(new APILoginSuccessHandler());
                config.failureHandler(new APILoginFailHandler());

            });
           
            //formLogin 이 호출되면 usernamepasswordauthenticationfilter가 호출되고 그 후에 다시 CustomUserDetailsService 의 
            //loadUserByUsername 이 호출되서 그 안에서 갖고 있는 정보를 토대로 DaoAuthenticationProvider에서 자동으로 비밀번호도 검증해줌 
            // 모든 요청에서 SecurityFilterChain  거침
            http.addFilterBefore(new JWTCheckFilter(), UsernamePasswordAuthenticationFilter.class) ;
            http.exceptionHandling(config -> {
                config.accessDeniedHandler(new CustomAccessDeniedHandler());
            });
            
            return http.build();
        }

        @Bean
        public CorsConfigurationSource corsConfigurationSource() {
            CorsConfiguration configuration = new CorsConfiguration();

            configuration.setAllowedOriginPatterns(Arrays.asList("*"));
            configuration.setAllowedMethods(Arrays.asList("HEAD" ,"GET","POST","PUT","DELETE"));
            configuration.setAllowedHeaders(Arrays.asList("Authorization" ,"Cache-Control" ,"Content-Type"));
            configuration.setAllowCredentials(true);

            UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
            source.registerCorsConfiguration("/**", configuration);

            return source ;
        }

        @Bean
        public PasswordEncoder passwordEncoder() {
            return new BCryptPasswordEncoder();
        }
}
