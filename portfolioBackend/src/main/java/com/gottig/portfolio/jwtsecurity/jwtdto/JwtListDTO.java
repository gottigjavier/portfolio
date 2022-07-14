package com.gottig.portfolio.jwtsecurity.jwtdto;

import lombok.Data;

@Data
public class JwtListDTO {

    //private Long userId;
    
    private String userName;
    
    public void setUserName(String name){
        this.userName = name;
    }
    
    public String getUserName(){
        return this.userName;
    }

    public JwtListDTO() {
    }

    public JwtListDTO(String userName) {
        this.userName = userName;
    }
    
    
    
    
    
    
}

