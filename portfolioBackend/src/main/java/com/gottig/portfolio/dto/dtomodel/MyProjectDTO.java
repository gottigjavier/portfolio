package com.gottig.portfolio.dto.dtomodel;

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
    
    private boolean projShow;
    
    private List<Technology> techList;
    
}
