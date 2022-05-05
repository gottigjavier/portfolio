package com.gottig.portfolio.controller;

import com.gottig.portfolio.model.About;
import com.gottig.portfolio.service.classes.AboutService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;


@RestController
public class AboutController {
    
    @Autowired
    private AboutService aboutService;
        
    @GetMapping("/about/list")
    @ResponseBody
    public List<About> getAll(){
        return aboutService.getAll();
    }
    
    @PostMapping("/about/create")
    @ResponseBody
    public String create(@RequestBody About about){
        aboutService.create(about);
        return "About created";
    }
    
    @DeleteMapping("/about/delete")
    @ResponseBody
    public About delete(@RequestBody About aboutId){  
        Long id = aboutId.getAboutId();
        System.out.println(id);
        aboutService.delete(id);
        return aboutId;
    }
    
    @PutMapping("/about/update")
    @ResponseBody
    public String update(@RequestBody About about){  
        Long id = about.getAboutId();
        if(id != null){
            About currentAbout;
            currentAbout = (About)aboutService.getOne(id);
            if(currentAbout != null){
                aboutService.create(about); // Solo existe el método save() para crear y para modificar.  
                return "About updated";
            }else{
                return "About not found";
            }
        }else{
            return "Id missing";
        }
    }
}