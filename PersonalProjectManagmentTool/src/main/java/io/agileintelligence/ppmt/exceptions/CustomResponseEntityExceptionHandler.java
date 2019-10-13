package io.agileintelligence.ppmt.exceptions;

import io.agileintelligence.ppmt.exceptions.projectidexception.ProjectIdException;
import io.agileintelligence.ppmt.exceptions.projectidexception.ProjectIdExceptionResponse;
import io.agileintelligence.ppmt.exceptions.projectnotfoundexception.ProjectNotFoundException;
import io.agileintelligence.ppmt.exceptions.projectnotfoundexception.ProjectNotFoundExceptionResponse;
import io.agileintelligence.ppmt.exceptions.userexception.UserNameException;
import io.agileintelligence.ppmt.exceptions.userexception.UserNameExceptionResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@ControllerAdvice
@RestController
public class CustomResponseEntityExceptionHandler extends ResponseEntityExceptionHandler {

    @ExceptionHandler
    public final ResponseEntity<Object> handleProjectIdException(ProjectIdException ex, WebRequest request){
        ProjectIdExceptionResponse exceptionResponse = new ProjectIdExceptionResponse(ex.getMessage());
        return new ResponseEntity(exceptionResponse, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler
    public final ResponseEntity<Object> handleProjectNotFoundException(ProjectNotFoundException ex, WebRequest request){
        ProjectNotFoundExceptionResponse exceptionResponse = new ProjectNotFoundExceptionResponse(ex.getMessage());
        return new ResponseEntity(exceptionResponse, HttpStatus.BAD_REQUEST);
    }


    @ExceptionHandler
    public final ResponseEntity<Object> handleUserNameException(UserNameException ex,WebRequest request){
        UserNameExceptionResponse response = new UserNameExceptionResponse(ex.getMessage());
        return new ResponseEntity(response,HttpStatus.BAD_REQUEST);
    }
}
