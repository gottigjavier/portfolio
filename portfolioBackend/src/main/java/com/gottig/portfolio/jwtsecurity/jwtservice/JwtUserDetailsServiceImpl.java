package com.gottig.portfolio.jwtsecurity.jwtservice;

import com.gottig.portfolio.jwtsecurity.jwtmodel.JwtUser;
import com.gottig.portfolio.jwtsecurity.jwtmodel.JwtUserMain;
import javax.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

/**
 * Clase que convierte la clase usuario en un UsuarioMain
 * UserDetailsService es propia de Spring Security
 */
@Service
@Transactional
public class JwtUserDetailsServiceImpl implements UserDetailsService {
    
    @Autowired
    JwtUserService userService;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        JwtUser user = userService.getByUser(username).get();
        return JwtUserMain.build(user);
    }
    
}
