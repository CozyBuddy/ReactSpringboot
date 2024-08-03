package org.zerock.mallapi.repository;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;


import lombok.extern.log4j.Log4j2;
//경로를 제대로 안 잡아서 test 할때 빈즈가 생성이 안된듯
@SpringBootTest
@Log4j2
public class TodoRepositoryTests {

    @Autowired
    private TodoRepository todoRepository;

    @Test
    public void test1() {
        log.info("------------------");
        log.info(todoRepository);

    }
}
