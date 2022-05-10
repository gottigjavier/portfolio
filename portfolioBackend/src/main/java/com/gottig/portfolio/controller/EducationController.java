package com.gottig.portfolio.controller;

import com.gottig.portfolio.model.Education;
import com.gottig.portfolio.service.classes.EducationService;
import com.gottig.portfolio.service.crudinterface.CRUDServiceInterface;
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
public class EducationController {
        
    @Autowired
    private EducationService eduService;
    
    @GetMapping("/education/list")
    @CrossOrigin(origins = "http://localhost:4200")
    @ResponseBody
    public List<Education> getAll(){
        return eduService.getAll();
    }
    
    @PostMapping("/education/create")
    @ResponseBody
    public String create(@RequestBody Education edu){
        eduService.create(edu);
        return "Education created";
    }
    
    @DeleteMapping("/education/delete")
    @ResponseBody
    public String delete(@RequestBody Education edu){  
        Long id = edu.getEducationId();
        System.out.println(id);
        eduService.delete(id);
        return "Education deleted";
    }
    
    @PutMapping("/education/update")
    @ResponseBody
    public String update(@RequestBody Education edu){  
        Long id = edu.getEducationId();
        if(id != null){
            Education currentEdu;
            currentEdu = (Education)eduService.getOne(id);
            if(currentEdu != null){
                eduService.create(edu); // Solo existe el método save() para crear y para modificar.  
                return "Education updated";
            }else{
                return "Education not found";
            }
        }else{
            return "Id missing";
        }
    }
}