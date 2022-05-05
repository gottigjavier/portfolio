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
@Entity(name= "SpokenLanguage")
@Table(name= "spoken_language")
public class SpokenLanguage implements Serializable{
    
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name="language_id")
    private Long languageId;
    
    @Column(name="language_name")
    private String languageName;
    
    @Column(name="language_level")
    private Double languageLevel;
    
    @Column(name="certification_url")
    private String certificationUrl;
    
    @Column(name="language_index")// En caso de necesitar que persista el orden dado en el front
    private int languageIndex;

    public SpokenLanguage() {
    }

    public SpokenLanguage(Long languageId, String languageName, Double languageLevel, String certificationUrl, int languageIndex) {
        this.languageId = languageId;
        this.languageName = languageName;
        this.languageLevel = languageLevel;
        this.certificationUrl = certificationUrl;
        this.languageIndex = languageIndex;
    }    
}
