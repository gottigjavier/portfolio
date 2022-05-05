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
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;



@RestController
public class SpokenLanguageController {
    
    @Autowired
    private SpokenLanguageService spokenLanguageService;
    
    @GetMapping("/spoken-language/list")
    @CrossOrigin(origins = "http://localhost:4200")
    @ResponseBody
    public List<SpokenLanguage> getAll(){
        return spokenLanguageService.getAll();
    }
    
    @PostMapping("/spoken-language/create")
    @ResponseBody
    public String create(@RequestBody SpokenLanguage spokenLanguage){
        spokenLanguageService.create(spokenLanguage);
        return "Spoken Language created";
    }
    
    @DeleteMapping("/spoken-language/delete")
    @ResponseBody
    public String delete(@RequestBody SpokenLanguage spokenLanguage){  
        Long id = spokenLanguage.getLanguageId();
        System.out.println(id);
        spokenLanguageService.delete(id);
        return "Spoken Language deleted";
    }
    
    @PutMapping("/spoken-language/update")
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
