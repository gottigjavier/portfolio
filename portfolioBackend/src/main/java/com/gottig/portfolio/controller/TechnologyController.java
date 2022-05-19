package com.gottig.portfolio.controller;

import com.gottig.portfolio.dto.dtomodel.TechnologyDTO;
import com.gottig.portfolio.dto.mapperinteface.CommonMapper;
import com.gottig.portfolio.model.Technology;
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
@RequestMapping("technology")
public class TechnologyController {
    
    private final String CROSSORIGIN = "http://localhost:4200";
    
    @Autowired
    private CRUDServiceInterface<Technology> techService;
    
    @Autowired
    private CommonMapper<TechnologyDTO, Technology> techMapper;
    
    @GetMapping("/list")
    @CrossOrigin(origins = CROSSORIGIN)
    @ResponseBody
    public List<TechnologyDTO> getAll(){
        return techMapper.toDtoAll(techService.getAll());
    }
    
    @GetMapping("/{id}")
    @CrossOrigin(origins = CROSSORIGIN)
    @ResponseBody
    public TechnologyDTO getOne(@PathVariable Long id){
        return techMapper.toDto(techService.getOne(id));
    }
    
    @PostMapping("/create")
    @CrossOrigin(origins = CROSSORIGIN)
    @ResponseBody
    public boolean create(@RequestBody TechnologyDTO techDTO){
        return techService.create(techMapper.toEntity(techDTO));
    }
    
    @PutMapping("/update")
    @CrossOrigin(origins = CROSSORIGIN)
    @ResponseBody
    public boolean update(@RequestBody TechnologyDTO techDTO){  
        return techService.update(techMapper.toEntity(techDTO));
    }
    
    @DeleteMapping("/delete/{id}")
    @CrossOrigin(origins = CROSSORIGIN)
    @ResponseBody
    public boolean delete(@RequestBody Long id){  
        return techService.delete(id);
    }
    
}
