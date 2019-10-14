package io.agileintelligence.ppmt.web;

import io.agileintelligence.ppmt.domain.User;
import io.agileintelligence.ppmt.payload.JWTLoginSuccessResponse;
import io.agileintelligence.ppmt.payload.LoginRequest;
import io.agileintelligence.ppmt.security.JwtTokenProvider;
import io.agileintelligence.ppmt.services.MapValidationErrorService;
import io.agileintelligence.ppmt.services.UserService;
import io.agileintelligence.ppmt.validator.UserValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

import static io.agileintelligence.ppmt.security.SecurityConstants.TOKEN_PREFIX;

@RestController
@RequestMapping("api/users")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private MapValidationErrorService mapValidationErrorService;

    @Autowired
    private UserValidator userValidator;

    @Autowired
    private JwtTokenProvider tokenProvider;

    @Autowired
    private AuthenticationManager authenticationManager;


    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest,BindingResult result){

        ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);

        if(errorMap!=null){
            return errorMap;
        }

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getUserName(),loginRequest.getPassword()));
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = TOKEN_PREFIX + tokenProvider.generateToken(authentication);

        return ResponseEntity.ok(new JWTLoginSuccessResponse(true,jwt));
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@Valid @RequestBody User user, BindingResult result){
        //validate the password
        if(user!=null){
            userValidator.validate(user,result);
        }

        ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
        if(errorMap!=null){
            return errorMap;
        }

        User newUser = userService.saveUser(user);

        return new ResponseEntity<User>(newUser,HttpStatus.CREATED);
    }

}

