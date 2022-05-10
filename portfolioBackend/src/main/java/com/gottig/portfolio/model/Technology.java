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
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

// @Data engloba: @ToString, @EqualsAndHashCode, @Getter y @Setter en todos los campos
@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity(name= "Technology")
@Table(name="technologies")
public class Technology implements Serializable{
    
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name="tech_id")
    private Long techId;
    
    @Column(name="tech_name")
    private String techName;
    
    @Column(name="tech_type")
    private String techType;
    
    @Column(name="tech_iconurl")
    private String techIconUrl;
    
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
    
}
