package com.gottig.portfolio.dto.classes;

import lombok.Data;
import org.springframework.stereotype.Service;



@Data
@Service
public class MyUserDTO {
    
    private Long userId;
    
    private String userName;
    
    private String userMail;

    private String userPassword;
    
}
