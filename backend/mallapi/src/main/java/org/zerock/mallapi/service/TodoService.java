package org.zerock.mallapi.service;

import org.zerock.mallapi.dto.TodoDTO;

public interface TodoService {
    Long register(TodoDTO todoDTO);
    TodoDTO get(Long tno);

    void modify(TodoDTO todoDTO);

    void remove(Long tno);
}
