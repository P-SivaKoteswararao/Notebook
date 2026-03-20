package com.siva.Notebook.repo;

import com.siva.Notebook.model.UserDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface UserRepo extends JpaRepository<UserDetails,Integer> {

    List<UserDetails> findByUserId(Integer userId);
}
