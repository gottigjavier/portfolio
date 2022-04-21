package com.gottig.portfolio.model;

import java.io.Serializable;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import lombok.Getter;
import lombok.Setter;


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
    
    
    @OneToOne(cascade =CascadeType.ALL)
    @JoinColumn(name= "about_id")
    private About about;
    
//    public void addAbout(About newAbout){
//        about.add(newAbout);
//        newAbout.setUser(this);
//    }
//    
//    public void removeAbout(About newAbout){
//        about.remove(newAbout);
//        newAbout.setUser(null);
//    }
    
    public About getAbout(){
        return about;
    }
    
    public void setAbout(About about){
        this.about = about;
    }

    public MyUser() {
    }

    public MyUser(Long userId, String username, String usermail, String userpassword) {
        this.userId = userId;
        this.username = username;
        this.usermail = usermail;
        this.userpassword = userpassword;
    }

        
}
