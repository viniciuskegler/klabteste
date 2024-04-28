package com.example.demo.exceptions.database;

public class DatabaseConnectionException extends RuntimeException {

    public DatabaseConnectionException(String error) {
        super(error);
    }
}
