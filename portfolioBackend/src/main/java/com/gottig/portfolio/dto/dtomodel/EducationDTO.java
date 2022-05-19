package com.gottig.portfolio.dto.dtomodel;

import lombok.Data;


@Data
public class EducationDTO {
    
    private Long educationId;
    
    private String educationType;
    
    private String institutionName;
    
    private String institutionLogo;
    
    private String institutionLink;
    
    private String educationCareer;
    
    private java.util.Date educationStart;
    
    private java.util.Date educationEnd;
    
    private Double approvedLevel;
    
    private int eduIndex;
    
}
