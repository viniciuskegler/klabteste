package com.example.demo.exceptions.webservice;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

import java.io.Serializable;

@ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
public class InternalServerErrorException extends RuntimeException implements Serializable {
    private static final long serialVersionUID = 1L;

    public InternalServerErrorException(String error) {
        super(error);
    }
}