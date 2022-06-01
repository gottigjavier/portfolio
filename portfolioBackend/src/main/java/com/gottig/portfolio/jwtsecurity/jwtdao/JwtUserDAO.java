package com.gottig.portfolio.jwtsecurity.jwtdao;

import com.gottig.portfolio.jwtsecurity.jwtmodel.JwtUser;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface JwtUserDAO extends JpaRepository<JwtUser, Long> {

    Optional<JwtUser> findByUserName(String userName);
    boolean existsByUserName (String userName);
    boolean existsByEmail (String email);
}
