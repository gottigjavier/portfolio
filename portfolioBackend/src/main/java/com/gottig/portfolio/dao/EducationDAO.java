package com.gottig.portfolio.dao;

import com.gottig.portfolio.model.Education;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EducationDAO extends JpaRepository<Education, Long>{
    
}
