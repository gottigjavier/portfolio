package com.gottig.portfolio.model;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;



@Data
@NoArgsConstructor
@AllArgsConstructor
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
    
    @Column(name="proj_show", columnDefinition = "boolean default true")
    private boolean projShow;
    
    @Column(name="proj_index")// En caso de necesitar que persista el orden dado en el front
    private int projIndex;
    
    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "inter_proj_tech", 
      joinColumns = @JoinColumn(name = "inter_proj_id"), 
      inverseJoinColumns = @JoinColumn(name = "inter_tech_id"))
    private List<Technology> techList= new ArrayList<>();   
    
    public List<Technology> getTechList(){
        return techList;
    }
    
    public void removeTech(Technology tech) {
        this.techList.remove(tech);
        tech.getProjectList().remove(this);
    }
    
}
