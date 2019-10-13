package io.agileintelligence.ppmt.services;

import io.agileintelligence.ppmt.domain.User;
import io.agileintelligence.ppmt.exceptions.userexception.UserNameException;
import io.agileintelligence.ppmt.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    public User saveUser(User user){

        try{
            //Username should be unique , need to throw custome exception
            user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));

            //Make sure Password and confirm password are match
            user.setConfirmPassword("");


            //We don't persist the confirm password
            return userRepository.save(user);
        }catch (Exception e){
            throw new UserNameException("User name "+user.getUserName()+" already existed");
        }

    }
}
