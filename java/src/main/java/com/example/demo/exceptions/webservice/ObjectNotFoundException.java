package com.example.demo.exceptions.webservice;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

import java.io.Serializable;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class ObjectNotFoundException extends RuntimeException implements Serializable {
    private static final long serialVersionUID = 1L;

    public ObjectNotFoundException(String error) {
        super(error);
    }
}

