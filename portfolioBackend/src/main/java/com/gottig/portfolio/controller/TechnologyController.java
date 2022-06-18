package com.gottig.portfolio.controller;

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
    
    
    @GetMapping("/list")
    @CrossOrigin(origins = "${cross.origin.value}")
    @ResponseBody
    public ResponseEntity getAll(){
        return ResponseEntity.ok(getList());
    }
    
    @GetMapping("/{id}")
    @CrossOrigin(origins = "${cross.origin.value}")
    @ResponseBody
    public ResponseEntity getOne(@PathVariable Long id){
        return ResponseEntity.ok(singleGet(id));
    }
    
    @PostMapping("/create")
    @CrossOrigin(origins = "${cross.origin.value}")
    @ResponseBody
    public ResponseEntity create(@RequestBody TechnologyDTO techDTO){
        if(!techService.create(techMapper.toEntity(techDTO))){
            return new ResponseEntity<>("Error: Not Created", HttpStatus.BAD_REQUEST);
        }
        return ResponseEntity.ok(getList());
    }
    
    @PutMapping("/update")
    @CrossOrigin(origins = "${cross.origin.value}")
    @ResponseBody
    public ResponseEntity update(@RequestBody TechnologyDTO techDTO){  
        if(!techService.update(techMapper.toEntity(techDTO))){
            return new ResponseEntity<>("Error: Not Updated", HttpStatus.NOT_MODIFIED);
        }
        return ResponseEntity.ok(singleGet(techDTO.getTechId()));
    }
    
    @PutMapping("/update/list")
    @CrossOrigin(origins = "${cross.origin.value}")
    @ResponseBody
    public ResponseEntity updateList(@RequestBody List<TechnologyDTO> techListDTO){
        for(TechnologyDTO techDTO : techListDTO){
         techService.update(techMapper.toEntity(techDTO));   
        }
        return ResponseEntity.ok(getList());
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
        if(!techService.delete(id)){
         return new ResponseEntity<>("Error: Not Deleted", HttpStatus.CONFLICT);   
        }
        return ResponseEntity.ok(getList());  
    }
    
    // Truco para que sienpre devuelva statusCode y statusCodeValue en response
    // sino solo devuelve el objeto o lista (body) en un 200
    public ResponseEntity getList(){
        List<TechnologyDTO> list = techMapper.toDtoAll(techService.getAll());
        if(list.size()<1){
            return new ResponseEntity<>("Error: List Empty", HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(list, HttpStatus.OK);
    }
    
    public ResponseEntity singleGet(Long id){
        TechnologyDTO obj= techMapper.toDto(techService.getOne(id));
        if(obj == null){
            return new ResponseEntity<>("Error: Not Found", HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(obj, HttpStatus.OK);
    }
    
}
