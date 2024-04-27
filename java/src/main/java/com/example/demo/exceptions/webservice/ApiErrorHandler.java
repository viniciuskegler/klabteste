package com.example.demo.exceptions.webservice;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import javax.servlet.http.HttpServletRequest;

@ControllerAdvice
public class ApiErrorHandler {

    @ExceptionHandler
    public ResponseEntity<ApiErrorResponse> handleBadRequestException(HttpServletRequest req, BadRequestException err) {
        ApiErrorResponse error = new ApiErrorResponse(HttpStatus.BAD_REQUEST.value(), err.getMessage(), System.currentTimeMillis(), req.getServletPath());
        return new ResponseEntity<ApiErrorResponse>(error, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler
    public ResponseEntity<ApiErrorResponse> handleInternalServererrorException(HttpServletRequest req, InternalServerErrorException err) {
        ApiErrorResponse error = new ApiErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR.value(), err.getMessage(), System.currentTimeMillis(), req.getServletPath());
        return new ResponseEntity<ApiErrorResponse>(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @ExceptionHandler
    public ResponseEntity<ApiErrorResponse> handleBadRequestException(HttpServletRequest req, ObjectNotFoundException err) {
        ApiErrorResponse error = new ApiErrorResponse(HttpStatus.NOT_FOUND.value(), err.getMessage(), System.currentTimeMillis(), req.getServletPath());
        return new ResponseEntity<ApiErrorResponse>(error, HttpStatus.NOT_FOUND);
    }
}
