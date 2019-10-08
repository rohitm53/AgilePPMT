package io.agileintelligence.ppmt.exceptions.projectnotfoundexception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.BAD_REQUEST)
public class ProjectNotFoundException extends RuntimeException{

    public ProjectNotFoundException(String message) {
        super(message);
    }
}
