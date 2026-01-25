package com.LNF_project.LNF.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler
    public ResponseEntity<String> handleRuntime(RuntimeException rx){
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(rx.getMessage());

    }
}
