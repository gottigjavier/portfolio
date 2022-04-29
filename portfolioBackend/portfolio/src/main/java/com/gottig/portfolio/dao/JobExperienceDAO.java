package com.gottig.portfolio.dao;

import com.gottig.portfolio.model.JobExperience;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface JobExperienceDAO extends JpaRepository<JobExperience, Long>{
    
}
