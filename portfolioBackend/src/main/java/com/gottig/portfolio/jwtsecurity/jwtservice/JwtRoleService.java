package com.gottig.portfolio.jwtsecurity.jwtservice;

import com.gottig.portfolio.jwtsecurity.jwtdao.JwtRoleDAO;
import com.gottig.portfolio.jwtsecurity.jwtenums.JwtRoleName;
import com.gottig.portfolio.jwtsecurity.jwtmodel.JwtRole;
import java.util.Optional;
import javax.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;



@Service
@Transactional
public class JwtRoleService {
    
    @Autowired
    JwtRoleDAO roleDao;

    public Optional<JwtRole> getByRoleName(JwtRoleName rolename){
        return  roleDao.findByRoleName(rolename);
    }

    public void save(JwtRole role){
        //roleDao.save(role);
         //Prueba para que no siga guardando roles porque me da error si hay
         //más de uno de cada uno, además la catalogué como "unique" para forzar
    }
    
}
