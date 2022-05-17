package com.gottig.portfolio.dto.classes;

import lombok.Data;


@Data
public class TechnologyDTO {
    
    private Long techId;
    
    private String techName;
    
    private String techType;
    
    private String techIconUrl;
    
    private String techDescription;
    
    private Double techLevel;
    
    private int techIndex;
    
}
