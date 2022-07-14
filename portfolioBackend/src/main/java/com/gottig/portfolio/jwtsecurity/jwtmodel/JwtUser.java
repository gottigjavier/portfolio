package com.gottig.portfolio.jwtsecurity.jwtmodel;

import com.sun.istack.NotNull;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import lombok.Data;


@Entity
@Data
public class JwtUser {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name= "user_id")
    private Long userId;
    
    @NotNull
    @Column(unique = true, name="username")
    private String userName;
    
    @NotNull
    @Column(unique = true)
    private String email;
    
    @NotNull
    private String password;

    @NotNull
    //Relación many to many
    //Un usuario puede tener MUCHOS roles y un rol puede PERTENECER a varios usuarios
    //Tabla intermedia que tiene dos campos que va a tener idUsuario y idRol
    @ManyToMany
    // join columns hace referencia a la columna que hace referencia hacia esta
    // Es decir la tabla usuario_rol va a tener un campo que se llama id_usuario
    // inverseJoinColumns = el inverso, hace referencia a rol
    @JoinTable(name = "user_role", joinColumns = @JoinColumn(name = "id_user_role"),
    inverseJoinColumns = @JoinColumn(name = "id_role_user"))
    private Set<JwtRole> roles = new HashSet<>();

    
    public JwtUser() {
        }

//Constuctor sin Id ni Roles
    public JwtUser(@NotNull String username, 
                   @NotNull String email, 
                   @NotNull String password
    ) {
        this.userName = username;
        this.email = email;
        this.password = password;
    }
    
    public Set<JwtRole> getRoles() {
        return roles;
    }

    public void setRoles(Set<JwtRole> roles) {
        this.roles = roles;
    }
    
    public void setPassword(String pass) {
        this.password = pass;
    }
}
