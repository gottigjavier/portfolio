package com.gottig.portfolio.controller;

import com.gottig.portfolio.dto.classes.AboutDTO;
import com.gottig.portfolio.dto.mapperintefaces.AboutMapper;
import com.gottig.portfolio.model.About;
import com.gottig.portfolio.service.classes.AboutService;
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
@RequestMapping("about")
public class AboutController {
    
    private final String CROSSORIGIN = "http://localhost:4200";
    
    @Autowired
    private AboutService aboutService;
    
    @Autowired
    private AboutMapper aboutMapper;
        
    @GetMapping("/list")
    @CrossOrigin(origins = CROSSORIGIN)
    @ResponseBody
    public List<AboutDTO> getAll(){
        return aboutMapper.toDtoAll(aboutService.getAll());
    }
    
    @PostMapping("/create")
    @CrossOrigin(origins = CROSSORIGIN)
    @ResponseBody
    public String create(@RequestBody About about){
        aboutService.create(about);
        return "About created";
    }
    
    @DeleteMapping("/delete")
    @CrossOrigin(origins = CROSSORIGIN)
    @ResponseBody
    public About delete(@RequestBody About aboutId){  
        Long id = aboutId.getAboutId();
        System.out.println(id);
        aboutService.delete(id);
        return aboutId;
    }
    
    @PutMapping("/update")
    @CrossOrigin(origins = CROSSORIGIN)
    @ResponseBody
    public String update(@RequestBody About about){
        Long id = about.getAboutId();
        if(id != null){
            return aboutService.update(about);
        }else{
            return "Id missing";
        }
    }
}