package io.agileintelligence.ppmt.payload;

import javax.validation.constraints.NotBlank;

public class LoginRequest {

    @NotBlank(message = "User Name cannot be blank")
    private String userName;
    @NotBlank(message = "Password cannot be blank")
    private String password;

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
