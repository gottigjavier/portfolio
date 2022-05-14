package com.gottig.portfolio.controller;

import com.gottig.portfolio.model.SpokenLanguage;
import com.gottig.portfolio.service.classes.SpokenLanguageService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;



@RestController
@RequestMapping("spoken-language")
public class SpokenLanguageController {
    
    private final String CROSSORIGIN = "http://localhost:4200";
    
    @Autowired
    private SpokenLanguageService spokenLanguageService;
    
    @GetMapping("/list")
    @CrossOrigin(origins = CROSSORIGIN)
    @ResponseBody
    public List<SpokenLanguage> getAll(){
        return spokenLanguageService.getAll();
    }
    
    @PostMapping("/create")
    @CrossOrigin(origins = CROSSORIGIN)
    @ResponseBody
    public String create(@RequestBody SpokenLanguage spokenLanguage){
        spokenLanguageService.create(spokenLanguage);
        return "Spoken Language created";
    }
    
    @DeleteMapping("/delete")
    @CrossOrigin(origins = CROSSORIGIN)
    @ResponseBody
    public String delete(@RequestBody SpokenLanguage spokenLanguage){  
        Long id = spokenLanguage.getLanguageId();
        System.out.println(id);
        spokenLanguageService.delete(id);
        return "Spoken Language deleted";
    }
    
    @PutMapping("/update")
    @CrossOrigin(origins = CROSSORIGIN)
    @ResponseBody
    public String update(@RequestBody SpokenLanguage spokenLanguage){  
        Long id = spokenLanguage.getLanguageId();
        if(id != null){
            SpokenLanguage currentSpokenLanguage;
            currentSpokenLanguage = (SpokenLanguage)spokenLanguageService.getOne(id);
            if(currentSpokenLanguage != null){
                spokenLanguageService.create(spokenLanguage); // Solo existe el método save() para crear y para modificar.  
                return "Spoken Language updated";
            }else{
                return "Spoken Language not found";
            }
        }else{
            return "Id missing";
        }
    }
    
}
