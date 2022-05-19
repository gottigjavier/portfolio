package com.gottig.portfolio.controller;

import com.gottig.portfolio.dto.dtomodel.MyProjectDTO;
import com.gottig.portfolio.dto.mapperinteface.CommonMapper;
import com.gottig.portfolio.model.MyProject;
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
import com.gottig.portfolio.service.crudinterface.CRUDServiceInterface;
import org.springframework.web.bind.annotation.PathVariable;



@RestController
@RequestMapping("my-project")
public class MyProjectController {
    
    private final String CROSSORIGIN = "http://localhost:4200";
    
    @Autowired
    private CRUDServiceInterface<MyProject> projService;
    
    @Autowired
    private CommonMapper<MyProjectDTO, MyProject> projMapper;
    
    @GetMapping("/list")
    @CrossOrigin(origins = CROSSORIGIN)
    @ResponseBody
    public List<MyProjectDTO> getAll(){
        return projMapper.toDtoAll(projService.getAll());
    }
    
    @GetMapping("/{id}")
    @CrossOrigin(origins = CROSSORIGIN)
    @ResponseBody
    public MyProjectDTO getOne(@PathVariable Long id){
        return projMapper.toDto(projService.getOne(id));
    }
    
    @PostMapping("/create")
    @CrossOrigin(origins = CROSSORIGIN)
    @ResponseBody
    public boolean create(@RequestBody MyProjectDTO projDTO){
        return projService.create(projMapper.toEntity(projDTO));
    }
    
    @PutMapping("/update")
    @CrossOrigin(origins = CROSSORIGIN)
    @ResponseBody
    public boolean update(@RequestBody MyProjectDTO projDTO){
        return projService.update(projMapper.toEntity(projDTO));
    }
    
    @DeleteMapping("/delete/{id}")
    @CrossOrigin(origins = CROSSORIGIN)
    @ResponseBody
    public boolean delete(@PathVariable Long id){  
        return projService.delete(id);
    }
    
}
