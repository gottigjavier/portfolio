package com.gottig.portfolio.jwtsecurity.jwtservice;

import com.gottig.portfolio.jwtsecurity.jwtdao.JwtUserDAO;
import com.gottig.portfolio.jwtsecurity.jwtmodel.JwtUser;
import java.util.List;
import java.util.Optional;
import javax.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;



@Service
@Transactional
public class JwtUserService {
    
    @Autowired
    JwtUserDAO userDao;

    public JwtUser getByUser(String username){
        return userDao.findByUserName(username).orElse(null);
    }

    public Boolean existsByUsuario(String username){
        return userDao.existsByUserName(username);
    }

    public Boolean existsByEmail(String email){
        return userDao.existsByEmail(email);
    }

    public void save(JwtUser user){
        userDao.save(user);
    }
    
    public void delete(Long id){
        userDao.deleteById(id);
    }

    public List<JwtUser> getAll(){
        return userDao.findAll();
    }
}
