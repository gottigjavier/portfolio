package com.gottig.portfolio.controller;

import com.gottig.portfolio.dto.classes.EducationDTO;
import com.gottig.portfolio.dto.mapperintefaces.CommonMapper;
import com.gottig.portfolio.model.Education;
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
@RequestMapping("education")
public class EducationController {
    
    private final String CROSSORIGIN = "http://localhost:4200";
        
    @Autowired
    private CRUDServiceInterface<Education> eduService;
    
    @Autowired
    private CommonMapper<EducationDTO, Education> eduMapper;
    
    @GetMapping("/list")
    @CrossOrigin(origins = CROSSORIGIN)
    @ResponseBody
    public List<EducationDTO> getAll(){
        return eduMapper.toDtoAll(eduService.getAll());
    }
    
    @GetMapping("/{id}")
    @CrossOrigin(origins = CROSSORIGIN)
    @ResponseBody
    public EducationDTO getOne(@PathVariable Long id){
        return eduMapper.toDto(eduService.getOne(id));
    }
    
    @PostMapping("/create")
    @CrossOrigin(origins = CROSSORIGIN)
    @ResponseBody
    public boolean create(@RequestBody EducationDTO eduDTO){
        return eduService.create(eduMapper.toEntity(eduDTO));
    }
    
    @PutMapping("/update")
    @CrossOrigin(origins = CROSSORIGIN)
    @ResponseBody
    public boolean update(@RequestBody EducationDTO eduDTO){
        return eduService.update(eduMapper.toEntity(eduDTO));
    }
    
    @DeleteMapping("/delete/{id}")
    @CrossOrigin(origins = CROSSORIGIN)
    @ResponseBody
    public boolean delete(@PathVariable Long id){
        return eduService.delete(id);
    }
    
}