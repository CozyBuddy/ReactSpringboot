package com.zerock.mallapi.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.zerock.mallapi.dto.TodoDTO;

import lombok.extern.log4j.Log4j2;

@Service
@Log4j2
@Transactional
public class TodoServiceImpl implements TodoService{

    public Long register(TodoDTO todoDTO){
        log.info(".........");
        return null;
    }
}
