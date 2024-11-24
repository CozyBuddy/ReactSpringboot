package com.zerock.mallapi.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.zerock.mallapi.domain.ChatRecord;

public interface ChatRepository extends JpaRepository<ChatRecord,Integer> {
    
}
