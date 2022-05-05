package com.gottig.portfolio.model;

import java.io.Serializable;
import java.util.Date;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import lombok.Getter;
import lombok.Setter;



@Getter @Setter
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
    
    @Temporal(TemporalType.DATE)
    private java.util.Date educationStart;
    
    @Temporal(TemporalType.DATE)
    private java.util.Date educationEnd;
    
    @Column(name="approved_level")
    private Double approvedLevel;
    
    @Column(name="edu_index")// En caso de necesitar que persista el orden dado en el front
    private int eduIndex;

    public Education() {
    }

    public Education(Long educationId, String educationType, String institutionName, String institutionLogo, String institutionLink, Date educationStart, Date educationEnd, Double approvedLevel, int eduIndex) {
        this.educationId = educationId;
        this.educationType = educationType;
        this.institutionName = institutionName;
        this.institutionLogo = institutionLogo;
        this.institutionLink = institutionLink;
        this.educationStart = educationStart;
        this.educationEnd = educationEnd;
        this.approvedLevel = approvedLevel;
        this.eduIndex = eduIndex;
    }    
}
