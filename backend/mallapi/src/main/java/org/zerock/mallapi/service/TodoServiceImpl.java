package org.zerock.mallapi.service;

import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.zerock.mallapi.domain.Todo;
import org.zerock.mallapi.dto.TodoDTO;
import org.zerock.mallapi.repository.TodoRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

@Service
@org.springframework.transaction.annotation.Transactional
@Log4j2
@RequiredArgsConstructor
public class TodoServiceImpl implements TodoService{

    private final ModelMapper modelMapper;
    private final TodoRepository todoRepository;

    @Override
    public Long register(TodoDTO todoDTO) {
       log.info("............");

       Todo todo = modelMapper.map(todoDTO, Todo.class);

       Todo savedTodo = todoRepository.save(todo);
       return savedTodo.getTno() ;
    }

    @Override
    public TodoDTO get(Long tno) {
        Optional<Todo> result = todoRepository.findById(tno);

        Todo todo = result.orElseThrow();

        TodoDTO dto = modelMapper.map(todo, TodoDTO.class);

        return dto ;
    }

    @Override
    public void modify(TodoDTO todoDTO) {
        Optional<Todo> result = todoRepository.findById(todoDTO.getTno());

        Todo todo = result.orElseThrow();

        todo.changeTitle(todoDTO.getTitle());
        todo.changeDueDate(todoDTO.getDuedate());
        todo.changeComplete(todoDTO.isComplete());

        todoRepository.save(todo);
    }

    @Override
    public void remove(Long tno) {
        todoRepository.deleteById(tno);
    }

}
