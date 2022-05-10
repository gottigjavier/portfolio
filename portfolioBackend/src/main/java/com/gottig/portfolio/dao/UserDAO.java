package com.gottig.portfolio.dao;

import com.gottig.portfolio.model.MyUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserDAO extends JpaRepository<MyUser, Long>{
    
}
