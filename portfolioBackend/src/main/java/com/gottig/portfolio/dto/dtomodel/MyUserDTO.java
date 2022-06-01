package com.gottig.portfolio.dto.dtomodel;

import java.util.List;
import lombok.Data;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;


@Data
public class MyUserDTO {
    
    private Long userId;
    
    private String userName;
    
    private String userMail;

    private String userPassword;
    
    private String userRole;
    
    
}
