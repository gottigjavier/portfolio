package com.gottig.portfolio.dao;

import com.gottig.portfolio.model.Technology;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TechnologyDAO extends JpaRepository<Technology, Long>{
    
}
