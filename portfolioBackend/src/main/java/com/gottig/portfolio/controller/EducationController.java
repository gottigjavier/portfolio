package com.gottig.portfolio.controller;

import com.gottig.portfolio.dto.dtomodel.EducationDTO;
import com.gottig.portfolio.dto.mapperinteface.CommonMapper;
import com.gottig.portfolio.model.Education;
import com.gottig.portfolio.service.crudinterface.CRUDServiceInterface;
import java.util.List;
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
@RequestMapping("education")
public class EducationController {
    
    @Autowired
    private CRUDServiceInterface<Education> eduService;
    
    @Autowired
    private CommonMapper<EducationDTO, Education> eduMapper;
    
    @GetMapping("/list")
    @CrossOrigin(origins = "${cross.origin.value}")
    @ResponseBody
    public ResponseEntity getAll(){
        return getList();
    }
    
    @GetMapping("/{id}")
    @CrossOrigin(origins = "${cross.origin.value}")
    @ResponseBody
    public ResponseEntity getOne(@PathVariable Long id){
        return singleGet(id);
    }
    
    @PostMapping("/create")
    @CrossOrigin(origins = "${cross.origin.value}")
    @ResponseBody
    public ResponseEntity create(@RequestBody EducationDTO eduDTO){
        if(!eduService.create(eduMapper.toEntity(eduDTO))){
            return new ResponseEntity<>("Education Not Created", HttpStatus.BAD_REQUEST);
        }
        return getList();
    }
    
    @PutMapping("/update")
    @CrossOrigin(origins = "${cross.origin.value}")
    @ResponseBody
    public ResponseEntity update(@RequestBody EducationDTO eduDTO){
        if(!eduService.update(eduMapper.toEntity(eduDTO))){
            return new ResponseEntity<>("Education Not Updated", HttpStatus.NOT_MODIFIED);
        }
        return singleGet(eduDTO.getEducationId());
    }
    
    @PutMapping("/update/list")
    @CrossOrigin(origins = "${cross.origin.value}")
    @ResponseBody
    public ResponseEntity updateList(@RequestBody List<EducationDTO> eduListDTO){
        for(EducationDTO eduDTO : eduListDTO){
            if(!eduService.update(eduMapper.toEntity(eduDTO))){
                return new ResponseEntity<>("Education Not Updated", HttpStatus.NOT_MODIFIED);
        }
        }
        return getList();
    }
    
    @DeleteMapping("/delete/{id}")
    @CrossOrigin(origins = "${cross.origin.value}")
    @ResponseBody
    public ResponseEntity delete(@PathVariable Long id){  
        if(!eduService.delete(id)){
            return new ResponseEntity<>("Education Not Deleted", HttpStatus.CONFLICT);
        }
        return getList();
    }
    
    
    public ResponseEntity getList(){
        List<EducationDTO> list = eduMapper.toDtoAll(eduService.getAll());
        if(list.size()<1){
            return new ResponseEntity<>("Education List Empty", HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(list, HttpStatus.OK);
    }
    
    public ResponseEntity singleGet(Long id){
        EducationDTO obj= eduMapper.toDto(eduService.getOne(id));
        if(obj == null){
            return new ResponseEntity<>("Education Not Found", HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(obj, HttpStatus.OK);
    }
    
}