package com.zerock.mallapi.controller;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.zerock.mallapi.dto.PageRequestDTO;
import com.zerock.mallapi.dto.PageResponseDTO;
import com.zerock.mallapi.dto.TodoDTO;
import com.zerock.mallapi.service.TodoService;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

import java.util.Map;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;




@RestController
@RequiredArgsConstructor
@Log4j2
@RequestMapping("/api/todo")
public class TodoController {
    private final TodoService service;

    
    @GetMapping("/{tno}")
    public TodoDTO get(@PathVariable(name = "tno") Long tno){
        return service.get(tno);
    }

    @GetMapping("/list")
    public PageResponseDTO<TodoDTO> list(PageRequestDTO pageRequestDTO){
            log.info(pageRequestDTO);
            return service.list(pageRequestDTO);
    }
    @PostMapping("/")
    public Map<String,Long> register(@RequestBody TodoDTO todoDTO) {
        log.info("TodoDTO :" + todoDTO);

        Long tno = service.register(todoDTO);
        return Map.of("TNO" , tno);
    }
    @PutMapping("/{tno}")
    public Map<String, String> modify(@PathVariable(name = "tno") Long tno, @RequestBody TodoDTO todoDTO) {
        todoDTO.setTno(tno);
        
        log.info("Modify : " + todoDTO);

        service.modify(todoDTO);
        return Map.of("Result :" , "Success");
    }

    @DeleteMapping("/{tno}")
    public Map<String,String> remove(@PathVariable(name = "tno") Long tno){
        log.info("Remove : " + tno);

        service.remove(tno);

        return Map.of("Result :" , "Success");
    }
    
    
}
