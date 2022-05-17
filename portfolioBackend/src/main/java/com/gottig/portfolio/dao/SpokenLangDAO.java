package com.gottig.portfolio.dao;

import com.gottig.portfolio.model.SpokenLang;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface SpokenLangDAO extends JpaRepository<SpokenLang, Long>{
    
}
