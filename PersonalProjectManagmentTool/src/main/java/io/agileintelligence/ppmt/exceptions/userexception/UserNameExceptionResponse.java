package io.agileintelligence.ppmt.exceptions.userexception;

public class UserNameExceptionResponse {

    private String username;

    public UserNameExceptionResponse(String username) {
        this.username = username;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }
}
