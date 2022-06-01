package com.gottig.portfolio.jwtsecurity.jwtdto;

import java.util.HashSet;
import java.util.Set;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import lombok.Data;


@Data
public class JwtNewUserDTO {
    
    @NotBlank
    private String userName;
    @Email
    private String email;
    @NotBlank
    private String password;
    //Por defecto crea un usuario normal
    //Si quiero un usuario Admin debo pasar este campo roles
    private Set<String> roles = new HashSet<>();

    
    public Set<String> getRoles() {
        return roles;
    }

    public void setRoles(Set<String> roles) {
        this.roles = roles;
    }
    
}
