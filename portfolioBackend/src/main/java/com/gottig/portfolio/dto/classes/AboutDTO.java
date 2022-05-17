package com.gottig.portfolio.dto.classes;

import lombok.Data;


@Data
public class AboutDTO {
    
    private Long aboutId;
    
    private String firstName;
    
    private String lastName;
    
    private String shortExplanation;
    
    private String photoUrl;
    
}
