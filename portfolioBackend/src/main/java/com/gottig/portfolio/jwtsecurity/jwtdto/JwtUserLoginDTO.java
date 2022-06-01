package com.gottig.portfolio.jwtsecurity.jwtdto;

import javax.validation.constraints.NotBlank;
import lombok.Data;


@Data
public class JwtUserLoginDTO {
    
    @NotBlank
    private String userName;
    @NotBlank
    private String password;
    
    
}
