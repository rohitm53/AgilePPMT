package io.agileintelligence.ppmt.exceptions.userexception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.BAD_REQUEST)
public class UserNameException extends RuntimeException{

    public UserNameException(String message) {
        super(message);
    }
}
