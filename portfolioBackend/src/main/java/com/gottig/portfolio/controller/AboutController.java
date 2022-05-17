package com.gottig.portfolio.controller;

import com.gottig.portfolio.dto.classes.AboutDTO;
import com.gottig.portfolio.dto.mapperintefaces.CommonMapper;
import com.gottig.portfolio.model.About;
import com.gottig.portfolio.service.crudinterface.CRUDServiceInterface;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
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
    private CRUDServiceInterface<About> aboutService;
    
    @Autowired
    private CommonMapper<AboutDTO, About> aboutMapper;
        
    @GetMapping("/list")
    @CrossOrigin(origins = CROSSORIGIN)
    @ResponseBody
    public List<AboutDTO> getAll(){
        return aboutMapper.toDtoAll(aboutService.getAll());
    }
    
    @GetMapping("/{id}")
    @CrossOrigin(origins = CROSSORIGIN)
    @ResponseBody
    public AboutDTO getOne(@PathVariable Long id){
        return aboutMapper.toDto(aboutService.getOne(id));
    }
    
    @PostMapping("/create")
    @CrossOrigin(origins = CROSSORIGIN)
    @ResponseBody
    public String create(@RequestBody AboutDTO aboutDTO){
        if(!aboutService.create(aboutMapper.toEntity(aboutDTO))){
            return "Error. Not Created";
        }
        return "Created";
    }
    
    @PutMapping("/update")
    @CrossOrigin(origins = CROSSORIGIN)
    @ResponseBody
    public String update(@RequestBody AboutDTO aboutDTO){
        if(!aboutService.update(aboutMapper.toEntity(aboutDTO))){
            return "Error. Not Updated";
        }
        return "Updated";
    }
    
    @DeleteMapping("/delete/{id}")
    @CrossOrigin(origins = CROSSORIGIN)
    @ResponseBody
    public String delete(@PathVariable Long id){  
        if(!aboutService.delete(id)){
            return "Error. Not Deleted";
        }
        return "Deleted";
    }
    
}