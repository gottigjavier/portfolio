package com.gottig.portfolio.model;

import java.io.Serializable;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@NoArgsConstructor
@AllArgsConstructor
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
    
    @Column(name="skill_url_icon")
    private String skillUrlIcon;
    
    @Column(name="skill_show", columnDefinition = "boolean default true")
    private boolean skillShow;
    
    @Column(name="skill_index")// En caso de necesitar que persista el orden dado en el front
    private int skillIndex;
    
}
