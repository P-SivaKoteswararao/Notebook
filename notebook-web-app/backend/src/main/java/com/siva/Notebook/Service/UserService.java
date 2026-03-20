package com.siva.Notebook.Service;

import com.siva.Notebook.model.UserDetails;
import com.siva.Notebook.repo.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    @Autowired
    private UserRepo userRepo;

    public void addNote(UserDetails userDetails)
    {
        userRepo.save(userDetails);
    }

    public List<UserDetails> getNotes(Integer userId) {
        return userRepo.findByUserId(userId);
    }

    public Boolean delNote(Integer userId,Integer noteId) {

        UserDetails note = userRepo.findById(noteId).orElse(null);
        if(note!=null && note.getUserId().equals(userId))
        {
            userRepo.deleteById(noteId);
            return true;
        }
        return false;
    }

    public Boolean updateNote(UserDetails userDetails,Integer userId) {

        UserDetails note = userRepo.findById(userDetails.getId()).orElse(null);

        if(note!=null && note.getUserId().equals(userId)) {

            note.setTitle(userDetails.getTitle());
            note.setDescription(userDetails.getDescription());
            note.setTag(userDetails.getTag());
            userRepo.save(note);
            return true;
        }
        return false;
    }
}
