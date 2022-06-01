package com.gottig.portfolio.jwtsecurity.jwtmodel;

import com.gottig.portfolio.jwtsecurity.jwtenums.JwtRoleName;
import com.sun.istack.NotNull;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import lombok.Data;


@Entity
@Data
public class JwtRole {
    
    @Id
    @GeneratedValue(strategy =  GenerationType.IDENTITY)
    @Column(name= "role_id")
    private int roleId;

    @NotNull
    //Se indica que va a ser un Enum de tipo String
    @Enumerated(EnumType.STRING)
    @Column(name= "rolename", unique = true)
    private JwtRoleName roleName;

    public JwtRole() {
    }
    
    public JwtRole(@NotNull JwtRoleName rolename) {
        this.roleName = rolename;
    }
    
    public int getId() {
        return roleId;
    }

    public void setId(int id) {
        this.roleId = id;
    } 
    
    public JwtRoleName getJwtRoleName(){
        return roleName;
    }

    public void setRoleName(JwtRoleName rolename) {
        this.roleName = rolename;
    }
}
