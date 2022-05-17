package com.gottig.portfolio.dto.classes;

import lombok.Data;


@Data
public class MyUserDTO {
    
    private Long userId;
    
    private String userName;
    
    private String userMail;

    private String userPassword;
    
}
