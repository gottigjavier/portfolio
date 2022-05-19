package com.gottig.portfolio.controller;

import com.gottig.portfolio.dto.dtomodel.AboutDTO;
import com.gottig.portfolio.dto.mapperinteface.CommonMapper;
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
    public boolean create(@RequestBody AboutDTO aboutDTO){
        return aboutService.create(aboutMapper.toEntity(aboutDTO));
    }
    
    @PutMapping("/update")
    @CrossOrigin(origins = CROSSORIGIN)
    @ResponseBody
    public boolean update(@RequestBody AboutDTO aboutDTO){
        return aboutService.update(aboutMapper.toEntity(aboutDTO));
    }
    
    @DeleteMapping("/delete/{id}")
    @CrossOrigin(origins = CROSSORIGIN)
    @ResponseBody
    public boolean delete(@PathVariable Long id){
        return aboutService.delete(id);
    }
    
}