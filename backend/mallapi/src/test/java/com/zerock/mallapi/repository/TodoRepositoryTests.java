package com.zerock.mallapi.repository;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import lombok.extern.log4j.Log4j2;

@SpringBootTest
@Log4j2
public class TodoRepositoryTests {
        @Autowired
        private TodoRepository todoRepository ;

        @Test
        public void test1(){

            log.info("----------------------");
            log.info(todoRepository);
        }
}
