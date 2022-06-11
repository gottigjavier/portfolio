package com.gottig.portfolio.dto.dtomodel;

import lombok.Data;

@Data
public class JobExperienceDTO {
    
    private Long jobId;
    
    private String companyName;
    
    private String companyLogoUrl;
    
    private String companyActivity;
    
    private String companyLink;
    
    private String jobPosition;
    
    private String jobDuties;
    
    private String lessonsLearned;
        
    private java.util.Date jobStart;
    
    private java.util.Date jobEnd;
    
    private boolean jobShow;
    
    private int jobIndex;
    
}
