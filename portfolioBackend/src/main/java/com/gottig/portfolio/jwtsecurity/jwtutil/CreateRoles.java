package com.gottig.portfolio.jwtsecurity.jwtutil;

import com.gottig.portfolio.jwtsecurity.jwtenums.JwtRoleName;
import com.gottig.portfolio.jwtsecurity.jwtmodel.JwtRole;
import com.gottig.portfolio.jwtsecurity.jwtservice.JwtRoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

// Comentar o borrar clase despues del primer run de la aplicación
@Component
public class CreateRoles implements CommandLineRunner {

    @Autowired
    JwtRoleService roleService;

    @Override
    public void run(String... args) throws Exception {
        JwtRole roleAdmin = new JwtRole(JwtRoleName.ROLE_ADMIN);
        JwtRole roleUser = new JwtRole(JwtRoleName.ROLE_USER);
        roleService.save(roleAdmin);
        roleService.save(roleUser);
    }
} 