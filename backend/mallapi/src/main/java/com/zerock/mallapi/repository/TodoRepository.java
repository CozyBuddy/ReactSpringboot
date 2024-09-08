package com.zerock.mallapi.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.zerock.mallapi.domain.Todo;

public interface TodoRepository extends JpaRepository<Todo, Long>{

}
