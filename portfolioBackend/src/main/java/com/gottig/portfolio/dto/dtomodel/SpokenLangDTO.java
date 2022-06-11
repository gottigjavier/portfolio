package com.gottig.portfolio.dto.dtomodel;

import lombok.Data;


@Data
public class SpokenLangDTO {
    
    private Long languageId;
    
    private String languageName;
    
    private String langLevel;
    
    private Double percentLevel;
 
    private String certificationUrl;
    
    private String langFlagUrl;
    
    private boolean langShow;
    
    private int languageIndex;
    
}
