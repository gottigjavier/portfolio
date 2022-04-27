package com.gottig.portfolio.model;

import java.io.Serializable;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import lombok.Getter;
import lombok.Setter;



/**
 *
 * @author gottig
 */
@Getter @Setter
@Entity(name= "MyUser")
@Table(name= "my_user")
public class MyUser implements Serializable {
    
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name="user_id")
    private Long userId;
    
    private String username;
    private String usermail;
    private String userpassword;
    
    public MyUser() {
    }

    /**
     *
     * @param userId
     * @param username
     * @param usermail
     * @param userpassword
     */
    public MyUser(Long userId, String username, String usermail, String userpassword) {
        this.userId = userId;
        this.username = username;
        this.usermail = usermail;
        this.userpassword = userpassword;
    }

        
}
