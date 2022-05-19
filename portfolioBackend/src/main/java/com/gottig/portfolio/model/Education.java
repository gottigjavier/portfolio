package com.gottig.portfolio.model;

import java.io.Serializable;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;



@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity(name= "Education")
@Table(name= "education")
public class Education implements Serializable{
    
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name="education_id")
    private Long educationId;
    
    @Column(name="education_type")
    private String educationType;
    
    @Column(name="institution_name")
    private String institutionName;
    
    @Column(name="institution_logo")
    private String institutionLogo;
    
    @Column(name="institution_link")
    private String institutionLink;
    
    @Column(name="education_career")
    private String educationCareer;
    
    @Temporal(TemporalType.DATE)
    @Column(name="education_start")
    private java.util.Date educationStart;
    
    @Temporal(TemporalType.DATE)
    @Column(name="education_end")
    private java.util.Date educationEnd;
    
    @Column(name="approved_level")
    private Double approvedLevel;
    
    @Column(name="edu_index")// En caso de necesitar que persista el orden dado en el front
    private int eduIndex;
    
}
