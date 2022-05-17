package com.gottig.portfolio.dto.classes;

import com.gottig.portfolio.model.Technology;
import java.util.List;
import lombok.Data;


@Data
public class MyProjectDTO {
 
    private Long projId;
    
    private String projName;
    
    private String projDescription;
    
    private String projUrl;
    
    private int projIndex;
    
    private List<Technology> techList;
    
}
