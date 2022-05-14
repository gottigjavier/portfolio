package com.gottig.portfolio.dto.classes;

import lombok.Data;
import org.springframework.stereotype.Service;

@Data
@Service
public class MyProjectDTO {
 
    private Long projId;
    
    private String projName;
    
    private String projDescription;
    
    private String projUrl;
    
    private int projIndex;
    
    //Set<TechnologyDTO> setOfProjects;
    
}
