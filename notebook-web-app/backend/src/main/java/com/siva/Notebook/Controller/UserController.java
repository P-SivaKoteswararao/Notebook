package com.siva.Notebook.Controller;

import com.siva.Notebook.Config.Jwt_token;
import com.siva.Notebook.Service.UserService;
import com.siva.Notebook.model.UserDetails;
import io.jsonwebtoken.ExpiredJwtException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private Jwt_token jwtToken;

    @PostMapping("/addNote")
    public ResponseEntity<String> addNote(@RequestHeader("Authorization") String authHeader,@RequestBody UserDetails userDetails){

        if(authHeader==null || !authHeader.startsWith("Bearer ")){
            return new ResponseEntity<>("Token not found",HttpStatus.UNAUTHORIZED);
        }
        String token = authHeader.substring(7).trim();

        try {
            Integer userId = jwtToken.extractUserId(token);
            userDetails.setUserId(userId);
        }
        catch(ExpiredJwtException e){
            return new ResponseEntity<>("Token expired",HttpStatus.UNAUTHORIZED);
        }

        userService.addNote(userDetails);
        return new ResponseEntity<>("Added Successfully",HttpStatus.OK);
    }

    @GetMapping("/notes")
    public ResponseEntity<?> getNotes(@RequestHeader("Authorization") String authHeader){

        if(authHeader==null || !authHeader.startsWith("Bearer ")){
            return new ResponseEntity<>("Token not found",HttpStatus.UNAUTHORIZED);
        }
        String token = authHeader.substring(7).trim();

        try {
            Integer userId = jwtToken.extractUserId(token);
            List<UserDetails> notes = userService.getNotes(userId);
            return new ResponseEntity<>(notes,HttpStatus.OK);
        }
        catch(ExpiredJwtException e){
            return new ResponseEntity<>("Token expired",HttpStatus.UNAUTHORIZED);
        }
    }

    @DeleteMapping("/deleteNote/{noteId}")
    public ResponseEntity<String> delNote(@RequestHeader("Authorization") String authHeader,@PathVariable Integer noteId){

        if(authHeader==null || !authHeader.startsWith("Bearer ")){
            return new ResponseEntity<>("Token not found",HttpStatus.UNAUTHORIZED);
        }

        String token = authHeader.substring(7).trim();
        try {
            Integer userId = jwtToken.extractUserId(token);
            boolean res = userService.delNote(userId,noteId);
            if(res) {
                return new ResponseEntity<>("Deleted Successfully",HttpStatus.OK);
            }
            return new ResponseEntity<>("Not Deleted",HttpStatus.BAD_REQUEST);
        }
        catch(ExpiredJwtException e){
            return new ResponseEntity<>("Token expired",HttpStatus.UNAUTHORIZED);
        }
    }

    @PostMapping("/updateNote")
    public ResponseEntity<String> updateNote(@RequestHeader("Authorization") String authHeader,@RequestBody UserDetails userDetails)
    {
        if(authHeader==null || !authHeader.startsWith("Bearer ")){
            return new ResponseEntity<>("Token not found",HttpStatus.UNAUTHORIZED);
        }
        String token = authHeader.substring(7).trim();

        try {
            Integer userId = jwtToken.extractUserId(token);
            boolean result = userService.updateNote(userDetails,userId);
            if(result){
                return new ResponseEntity<>("Updated Successfully",HttpStatus.OK);
            }
            return new ResponseEntity<>("Not updated",HttpStatus.BAD_REQUEST);
        }
        catch(ExpiredJwtException e){
            return new ResponseEntity<>("Token expired",HttpStatus.UNAUTHORIZED);
        }

    }

}
