package com.siva.Notebook.Controller;

import com.siva.Notebook.Service.SignupService;
import com.siva.Notebook.model.LoginDetails;
import com.siva.Notebook.model.LoginResponse;
import com.siva.Notebook.model.SignupDetails;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*")
@RestController
public class SignupController {

    @Autowired
    private SignupService signupService;

    @GetMapping("/")
    public String test(){
        return "backend is running";
    }

    @PostMapping("/signup")
    public ResponseEntity<Boolean> signUp(@RequestBody SignupDetails signupDetails){
        boolean found = signupService.signUp(signupDetails);
        if(found)
        {
            return new ResponseEntity<>(found,HttpStatus.NOT_ACCEPTABLE);
        }
        return new ResponseEntity<>(found,HttpStatus.OK);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginDetails loginDetails)
    {
        LoginResponse test = signupService.check(loginDetails);

        if(test.getToken()!=null)
        {
            return new ResponseEntity<>(test,HttpStatus.OK);
        }
        return new ResponseEntity<>("Incorrect details",HttpStatus.NOT_FOUND);
    }
}
