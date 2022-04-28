package com.gottig.portfolio.model;

import java.io.Serializable;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import lombok.Getter;
import lombok.Setter;



/**
 *
 * @author gottig
 */
@Getter @Setter
@Entity(name= "About")
@Table(name="about")
public class About implements Serializable {
    
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name="about_id")
    private Long aboutId;
    
    private String name;
    private String surname;
    @Column(name="short_explanation")
    private String shortExplanation;

    public About() {
    }

    public About(Long aboutId, String name, String surname, String shortExplanation) {
        this.aboutId = aboutId;
        this.name = name;
        this.surname = surname;
        this.shortExplanation = shortExplanation;
    }
    

}
