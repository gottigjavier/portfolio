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
    
//    @ManyToOne(fetch = FetchType.LAZY)
//    @JoinColumn(name = "user_id")
//    private MyUser user;
//    
//    @Override
//    public boolean equals(Object o) {
//        if (this == o) return true;
//        if (!(o instanceof About )) return false;
//        return aboutId != null && aboutId.equals(((About) o).getAboutId());
//    }
// 
//    @Override
//    public int hashCode() {
//        return getClass().hashCode();
//    }

    public About() {
    }

    public About(Long aboutId, String name, String surname, String shortExplanation, MyUser user) {
        this.aboutId = aboutId;
        this.name = name;
        this.surname = surname;
        this.shortExplanation = shortExplanation;
    //    this.user = user;
    }

    
    
    
    
}
