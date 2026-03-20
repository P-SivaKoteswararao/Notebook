package com.siva.Notebook.Service;

import com.siva.Notebook.Config.Jwt_token;
import com.siva.Notebook.model.LoginDetails;
import com.siva.Notebook.model.LoginResponse;
import com.siva.Notebook.model.SignupDetails;
import com.siva.Notebook.repo.SignupRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class SignupService {

    @Autowired
    private SignupRepo signupRepo;

    @Autowired
    private Jwt_token jwtToken;

    @Autowired
    private LoginResponse loginResponse;

    public boolean signUp(SignupDetails signupDetails) {

        boolean user = signupRepo.existsByEmail(signupDetails.getEmail());
        if(!user) {
            BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
            String hashpassword = encoder.encode(signupDetails.getPassword());
            signupDetails.setPassword(hashpassword);
            signupDetails.setCpassword(hashpassword);
            signupRepo.save(signupDetails);
            return false;
        }
        return true;
    }

    public LoginResponse check(LoginDetails loginDetails) {

        SignupDetails user = signupRepo.findByEmail(loginDetails.getEmail());

        if(user==null)
        {
            return null;
        }

        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        if(encoder.matches(loginDetails.getPassword(),user.getPassword()))
        {
            String token = jwtToken.generateToken(user.getId());
            loginResponse.setUsername(user.getUsername());
            loginResponse.setToken(token);
            return loginResponse;
        }
        return null;
    }

}
