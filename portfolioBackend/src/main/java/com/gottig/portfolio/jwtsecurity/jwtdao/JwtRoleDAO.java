package com.gottig.portfolio.jwtsecurity.jwtdao;

import com.gottig.portfolio.jwtsecurity.jwtenums.JwtRoleName;
import com.gottig.portfolio.jwtsecurity.jwtmodel.JwtRole;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface JwtRoleDAO extends JpaRepository<JwtRole, Integer> {

    Optional<JwtRole> findByRoleName(JwtRoleName rolename);
}
