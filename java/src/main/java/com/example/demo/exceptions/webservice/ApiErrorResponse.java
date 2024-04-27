package com.example.demo.exceptions.webservice;

import java.io.Serializable;

public class ApiErrorResponse implements Serializable {
    private static final long serialVersionUID = 1L;
    private int status;

    private String message;

    private long timestamp;

    private String path;

    public ApiErrorResponse(int status, String message, long timestamp, String path) {
        this.status = status;
        this.message = message;
        this.timestamp = timestamp;
        this.path = path;
    }

    public int getStatus() {
        return status;
    }

    public String getMessage() {
        return message;
    }

    public long getTimestamp() {
        return timestamp;
    }

    public String getPath() {
        return path;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public void setTimestamp(long timestamp) {
        this.timestamp = timestamp;
    }

    public void setPath(String path) {
        this.path = path;
    }
}
