package com.gottig.portfolio.jwtsecurity.jwtmodel;

import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;


/**
 * Clase Encargada de generar la seguridad
 * Clase que implementa los privilegios de cada usuario
 * UserDetails es una clase propia de Spring Security
 */
public class JwtUserMain implements UserDetails {
    
    private String user;
    private String email;
    private String password;
    // Variable que nos da la autorización (no confundir con autenticación)
    // Coleccion de tipo generico que extendiende
    // de GranthedAuthority de Spring security
    private Collection<? extends GrantedAuthority> authorities;

    //Constructor
    public JwtUserMain(String usuario, String email, String password, Collection<? extends GrantedAuthority> authorities) {
        this.user = usuario;
        this.email = email;
        this.password = password;
        this.authorities = authorities;
    }

    //Metodo que asigna los privilegios (autorización)
    public static JwtUserMain build(JwtUser puser){
        //Convertimos la clase Rol a la clase GrantedAuthority
        List<GrantedAuthority> authorities =
                puser.getRoles()
                        .stream()
                        .map(rol -> new SimpleGrantedAuthority(rol.getRoleName().name()))
                .collect(Collectors.toList());
        return new JwtUserMain(puser.getUserName(), puser.getEmail(),
                puser.getPassword(), authorities);
    }

    //@Override los que tengan esta anotación
      // significa que son metodos de UserDetails de SpringSecurity
    
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return user;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    public String getEmail() {
        return email;
    }
    
}
