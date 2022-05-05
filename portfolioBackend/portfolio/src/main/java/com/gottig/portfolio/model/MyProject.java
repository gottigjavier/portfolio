package com.gottig.portfolio.model;

import java.io.Serializable;
import java.util.Set;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.Table;
import lombok.Getter;
import lombok.Setter;



@Getter @Setter
@Entity(name= "MyProject")
@Table(name="my_project")
public class MyProject implements Serializable {
    
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name="proj_id")
    private Long projId;
    
    @Column(name="proj_name")
    private String projName;
    
    @Column(name="proj_description")
    private String projDescription;
    
    @Column(name="proj_url")
    private String projUrl;
    
    @Column(name="proj_index")// En caso de necesitar que persista el orden dado en el front
    private int projIndex;
    
    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(name = "proj_tech", 
      joinColumns = @JoinColumn(name = "proj_id"), 
      inverseJoinColumns = @JoinColumn(name = "tech_id"))
    private Set<Technology> techList;
    
    public Set<Technology> getTechnology(){
        return techList;
    }

    public MyProject() {
    }

    public MyProject(Long projId, String projName, String projDescription, String projUrl, int projIndex, Set<Technology> techList) {
        this.projId = projId;
        this.projName = projName;
        this.projDescription = projDescription;
        this.projUrl = projUrl;
        this.projIndex = projIndex;
        this.techList = techList;
    }
}
