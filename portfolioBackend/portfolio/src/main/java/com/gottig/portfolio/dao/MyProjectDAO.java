package com.gottig.portfolio.dao;

import com.gottig.portfolio.model.MyProject;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface MyProjectDAO extends JpaRepository<MyProject, Long>{
    
}
