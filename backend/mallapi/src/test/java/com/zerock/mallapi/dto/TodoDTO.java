package com.zerock.mallapi.dto;

import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class TodoDTO {
    private Long tno;

    private String title;

    private String writer ;

    private boolean complete;

    @JsonFormat( shape = JsonFormat.Shape.STRING , pattern = "yyyy-MM-dd")
    private LocalDate dueDate;
    
}
