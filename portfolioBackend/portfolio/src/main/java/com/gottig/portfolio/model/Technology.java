package com.gottig.portfolio.model;

import java.io.Serializable;
import java.util.Set;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.Table;
import lombok.Getter;
import lombok.Setter;


@Getter @Setter
@Entity(name= "Technology")
@Table(name="technologies")
public class Technology implements Serializable{
    
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name="tech_id")
    private Long techId;
    
    @Column(name="tech_name")
    private String techName;
    
    @Column(name="tech_description")
    private String techDescription;
    
    @Column(name="tech_level")
    private Double techLevel;
    
    @Column(name="tech_index")// En caso de necesitar que persista el orden dado en el front
    private int techIndex;
    
    @ManyToMany(mappedBy = "techList")
    private Set<MyProject> myProject;
    
    public Set<MyProject> getMyProject(){
        return myProject;
    }

    public Technology() {
    }

    public Technology(Long techId, String techName, String techDescription, Double techLevel, int techIndex, Set<MyProject> myProject) {
        this.techId = techId;
        this.techName = techName;
        this.techDescription = techDescription;
        this.techLevel = techLevel;
        this.techIndex = techIndex;
        this.myProject = myProject;
    }    
}
