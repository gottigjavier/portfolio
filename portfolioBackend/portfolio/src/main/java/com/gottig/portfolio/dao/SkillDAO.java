package com.gottig.portfolio.dao;

import com.gottig.portfolio.model.Skill;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface SkillDAO extends JpaRepository<Skill, Long>{
    
}
