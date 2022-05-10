package com.gottig.portfolio.model;

import java.io.Serializable;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


// @Data engloba: @ToString, @EqualsAndHashCode, @Getter y @Setter en todos los campos
@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity(name= "MyUser")
@Table(name= "my_user")
public class MyUser implements Serializable {
    
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name="user_id")
    private Long userId;
    
    @Column(name="user_name")
    private String userName;
    
    @Column(name="user_mail")
    private String userMail;

    @Column(name="user_password")
    private String userPassword;
        
}
