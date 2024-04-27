package com.example.demo.exceptions.webservice;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

import java.io.Serializable;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class BadRequestException extends RuntimeException implements Serializable {
    private static final long serialVersionUID = 1L;

    public BadRequestException(String error) {
        super(error);
    }
}
