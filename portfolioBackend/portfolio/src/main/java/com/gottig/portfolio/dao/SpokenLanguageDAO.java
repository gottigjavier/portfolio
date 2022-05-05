package com.gottig.portfolio.dao;

import com.gottig.portfolio.model.SpokenLanguage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface SpokenLanguageDAO extends JpaRepository<SpokenLanguage, Long>{
    
}
