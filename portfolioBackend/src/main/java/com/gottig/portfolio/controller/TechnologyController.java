package com.gottig.portfolio.controller;

import com.gottig.portfolio.dto.dtomodel.MyProjectDTO;
import com.gottig.portfolio.dto.dtomodel.TechnologyDTO;
import com.gottig.portfolio.dto.mapperinteface.CommonMapper;
import com.gottig.portfolio.model.MyProject;
import com.gottig.portfolio.model.Technology;
import com.gottig.portfolio.service.crudinterface.CRUDServiceInterface;
import java.util.List;
import java.util.Objects;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
    
    @Autowired
    private CRUDServiceInterface<Technology> techService;
    
    @Autowired
    private CommonMapper<TechnologyDTO, Technology> techMapper;
    
    @Autowired
    private CRUDServiceInterface<MyProject> projService;
    
    @Autowired
    private CommonMapper<MyProjectDTO, MyProject> projMapper;
    
    @GetMapping("/list")
    @CrossOrigin(origins = "${cross.origin.value}")
    @ResponseBody
    public List<TechnologyDTO> getAll(){
        return techMapper.toDtoAll(techService.getAll());
    }
    
    @GetMapping("/{id}")
    @CrossOrigin(origins = "${cross.origin.value}")
    @ResponseBody
    public TechnologyDTO getOne(@PathVariable Long id){
        return techMapper.toDto(techService.getOne(id));
    }
    
    @PostMapping("/create")
    @CrossOrigin(origins = "${cross.origin.value}")
    @ResponseBody
    public boolean create(@RequestBody TechnologyDTO techDTO){
        return techService.create(techMapper.toEntity(techDTO));
    }
    
    @PutMapping("/update")
    @CrossOrigin(origins = "${cross.origin.value}")
    @ResponseBody
    public boolean update(@RequestBody TechnologyDTO techDTO){  
        return techService.update(techMapper.toEntity(techDTO));
    }
    
    @PutMapping("/update/list")
    @CrossOrigin(origins = "${cross.origin.value}")
    @ResponseBody
    public List<TechnologyDTO> updateList(@RequestBody List<TechnologyDTO> techListDTO){
        for(TechnologyDTO techDTO : techListDTO){
         techService.update(techMapper.toEntity(techDTO));   
        }
        return getAll();
    }
    
    @DeleteMapping("/delete/{id}")
    @CrossOrigin(origins = "${cross.origin.value}")
    @ResponseBody
    public ResponseEntity delete(@PathVariable Long id){  
        List<MyProject> projList;
        projList = projService.getAll();
        for (MyProject proj: projList){
            List<Technology> techList = proj.getTechList();
            for(Technology tech : techList){
                if(Objects.equals(tech.getTechId(), id)){
                    proj.removeTech(tech);
                    projService.update(proj);
                    break;
                }
            }
        }
        techService.delete(id);
          return new ResponseEntity<>(getAll(), HttpStatus.OK);  
    }
    
}
