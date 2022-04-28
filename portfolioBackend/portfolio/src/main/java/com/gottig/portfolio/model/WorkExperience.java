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
import lombok.Getter;
import lombok.Setter;


@Getter @Setter
@Entity(name= "WorkExperience")
@Table(name= "work_experience")
public class WorkExperience implements Serializable {
    
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name="work_id")
    private Long workId;
    
    @Column(name="company_name")
    private String company;
    
    @Column(name="logo_url")
    private String companyLogo;
    
    @Column(name="company_activity")
    private String compActivity;
    
    @Column(name="position")
    private String position;
    
    @Column(name="work_duties") // Deberes laborales
    private String workDuties;
    
    @Column(name="lessons_learned")
    private String lessonsLearned;
        
    @Temporal(TemporalType.DATE)
    private java.util.Date startWork;
    
    @Temporal(TemporalType.DATE)
    private java.util.Date endWork;


}
