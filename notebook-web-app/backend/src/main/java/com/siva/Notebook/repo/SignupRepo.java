package com.siva.Notebook.repo;

import com.siva.Notebook.model.SignupDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SignupRepo extends JpaRepository<SignupDetails,String> {

    SignupDetails findByEmail(String email);
    boolean existsByEmail(String email);
}
