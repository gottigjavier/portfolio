package com.gottig.portfolio.controller;

import com.gottig.portfolio.model.Technology;
import com.gottig.portfolio.service.classes.TechnologyService;
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
public class TechnologyController {
    
    @Autowired
    private TechnologyService technologyService;
    
    @GetMapping("/technology/list")
    @CrossOrigin(origins = "http://localhost:4200")
    @ResponseBody
    public List<Technology> getAll(){
        return technologyService.getAll();
    }
    
    @PostMapping("/technology/create")
    @ResponseBody
    public String create(@RequestBody Technology technology){
        technologyService.create(technology);
        return "Technology created";
    }
    
    @DeleteMapping("/technology/delete")
    @ResponseBody
    public String delete(@RequestBody Technology technology){  
        Long id = technology.getTechId();
        System.out.println(id);
        technologyService.delete(id);
        return "Technology deleted";
    }
    
    @PutMapping("/technology/update")
    @ResponseBody
    public String update(@RequestBody Technology technology){  
        Long id = technology.getTechId();
        if(id != null){
            Technology currentTechnology;
            currentTechnology = (Technology)technologyService.getOne(id);
            if(currentTechnology != null){
                technologyService.create(technology); // Solo existe el método save() para crear y para modificar.  
                return "Technology updated";
            }else{
                return "Technology not found";
            }
        }else{
            return "Id missing";
        }
    }
    
}
