package com.zerock.mallapi.service;


import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.zerock.mallapi.dto.PageRequestDTO;
import com.zerock.mallapi.dto.PageResponseDTO;
import com.zerock.mallapi.dto.TodoDTO;

import lombok.extern.log4j.Log4j2;

@SpringBootTest
@Log4j2
public class TodoServiceTests {
   
    @Autowired
    private TodoService todoService;
    
    @Test
    public void testRegister(){
        TodoDTO todoDTO = TodoDTO.builder()
        .title("서비스 테스트")
        .writer("tester")
        .dueDate(java.time.LocalDate.of(2023, 10, 10))
        .build();

        Long tno = todoService.register(todoDTO);

        log.info("TNO : " + tno);
    }

    @Test
    public void testGet() {
        Long tno = 101l;

        TodoDTO todoDTO = todoService.get(tno);

        log.info(todoDTO);
    }

    @Test
    public void testModify(){
        Long tno = 101l;
        TodoDTO todoDTO = todoService.get(tno);
        todoDTO.setTitle("수정된 제목");
        todoService.modify(todoDTO);

        log.info("수정내역:" +todoDTO);
    }

    @Test
    public void testRemove(){
        Long tno = 101l;
        
        todoService.remove(tno);

        log.info("삭제번호 :" + tno);
    }
    @Test
    public void testList(){
        PageRequestDTO pageRequestDTO = PageRequestDTO.builder().page(2).size(10).build();

        PageResponseDTO<TodoDTO> pageResponseDTO = todoService.list(pageRequestDTO);

        log.info(pageResponseDTO);
    }
}
