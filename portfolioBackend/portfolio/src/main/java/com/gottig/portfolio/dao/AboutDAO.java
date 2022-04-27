package com.gottig.portfolio.dao;

import com.gottig.portfolio.model.About;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


/**
 *
 * @author gottig
 */
@Repository
public interface AboutDAO extends JpaRepository<About, Long> {
    
}
