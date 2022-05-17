package com.gottig.portfolio.dto.classes;

import lombok.Data;



@Data
public class SkillDTO {
    
    private Long skillId;
    
    private String skillName;
    
    private String skillType;
    
    private String skillDescription;
    
    private Double skillLevel;
    
    private String skillUrlIcon;
    
    private int skillIndex;
    
}
