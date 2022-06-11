package com.gottig.portfolio.dto.dtomodel;

import lombok.Data;



@Data
public class SkillDTO {
    
    private Long skillId;
    
    private String skillName;
    
    private String skillType;
    
    private String skillDescription;
    
    private Double skillLevel;
    
    private String skillUrlIcon;
    
    private boolean skillShow;
    
    private int skillIndex;
    
}
