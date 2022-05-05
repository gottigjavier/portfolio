package com.gottig.portfolio.model;

import java.io.Serializable;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import lombok.Getter;
import lombok.Setter;


@Getter @Setter
@Entity(name= "Skill")
@Table(name="skills")
public class Skill implements Serializable{
    
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name="skill_id")
    private Long skillId;
    
    @Column(name="skill_name")
    private String skillName;
    
    @Column(name="skill_type")
    private String skillType;
    
    @Column(name="skill_description")
    private String skillDescription;
    
    @Column(name="skill_level")
    private Double skillLevel;
    
    @Column(name="skill_urlicon")
    private String skillUrlIcon;
    
    @Column(name="skill_index")// En caso de necesitar que persista el orden dado en el front
    private int skillIndex;

    public Skill() {
    }

    public Skill(Long skillId, String skillName, String skillType, String skillDescription, Double skillLevel, String skillUrlIcon, int skillIndex) {
        this.skillId = skillId;
        this.skillName = skillName;
        this.skillType = skillType;
        this.skillDescription = skillDescription;
        this.skillLevel = skillLevel;
        this.skillUrlIcon = skillUrlIcon;
        this.skillIndex = skillIndex;
    }
}
