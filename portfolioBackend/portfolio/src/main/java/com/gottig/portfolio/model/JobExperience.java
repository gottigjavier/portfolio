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
@Entity(name= "JobExperience")
@Table(name= "job_experience")
public class JobExperience implements Serializable {
    
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name="job_id")
    private Long jobId;
    
    @Column(name="company_name")
    private String company;
    
    @Column(name="logo_url")
    private String companyLogo;
    
    @Column(name="company_activity")
    private String compActivity;
    
    @Column(name="company_link")
    private String compLink;
    
    @Column(name="position")
    private String position;
    
    @Column(name="job_duties") // Deberes laborales
    private String jobDuties;
    
    @Column(name="lessons_learned")
    private String lessonsLearned;
        
    @Temporal(TemporalType.DATE)
    private java.util.Date jobStart;
    
    @Temporal(TemporalType.DATE)
    private java.util.Date workEnd;
    
    @Column(name="job_index")// En caso de necesitar que persista el orden dado en el front
    private int jobIndex;

    public JobExperience() {
    }

    public JobExperience(Long jobId, String company, String companyLogo, String compActivity, String compLink, String position, String jobDuties, String lessonsLearned, Date jobStart, Date workEnd, int jobIndex) {
        this.jobId = jobId;
        this.company = company;
        this.companyLogo = companyLogo;
        this.compActivity = compActivity;
        this.compLink = compLink;
        this.position = position;
        this.jobDuties = jobDuties;
        this.lessonsLearned = lessonsLearned;
        this.jobStart = jobStart;
        this.workEnd = workEnd;
        this.jobIndex = jobIndex;
    }
}