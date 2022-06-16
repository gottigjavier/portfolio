package com.gottig.portfolio.controller;

import com.gottig.portfolio.dto.dtomodel.AboutDTO;
import com.gottig.portfolio.dto.mapperinteface.CommonMapper;
import com.gottig.portfolio.model.About;
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
@RequestMapping("about")
public class AboutController {
    
    @Autowired
    private CRUDServiceInterface<About> aboutService;
    
    @Autowired
    private CommonMapper<AboutDTO, About> aboutMapper;
        
    @GetMapping("/list")
    @CrossOrigin(origins = "${cross.origin.value}")
    @ResponseBody
    public ResponseEntity getAll(){
        List<AboutDTO> list = aboutMapper.toDtoAll(aboutService.getAll());
        if(list.size()<1){
            return new ResponseEntity<>("Error: List Empty", HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(list, HttpStatus.OK);
    }
    
    @GetMapping("/{id}")
    @CrossOrigin(origins = "${cross.origin.value}")
    @ResponseBody
    public ResponseEntity getOne(@PathVariable Long id){
        AboutDTO oneAbout= aboutMapper.toDto(aboutService.getOne(id));
        if(oneAbout == null){
            return new ResponseEntity<>("Error: Not Found", HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(oneAbout, HttpStatus.OK);
    }
    
    @PostMapping("/create")
    @CrossOrigin(origins = "${cross.origin.value}")
    @ResponseBody
    public ResponseEntity create(@RequestBody AboutDTO aboutDTO){
        if(!aboutService.create(aboutMapper.toEntity(aboutDTO))){
            return new ResponseEntity<>("Error: Not Created", HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(getAll(), HttpStatus.OK);
    }
    
    @PutMapping("/update")
    @CrossOrigin(origins = "${cross.origin.value}")
    @ResponseBody
    public ResponseEntity update(@RequestBody AboutDTO aboutDTO){
        if(!aboutService.update(aboutMapper.toEntity(aboutDTO))){
            return new ResponseEntity<>("Error: Not Updated", HttpStatus.NOT_MODIFIED);
        }
        return new ResponseEntity<>(getOne(aboutDTO.getAboutId()), HttpStatus.OK);
    }
    
    @PutMapping("/update/list")
    @CrossOrigin(origins = "${cross.origin.value}")
    @ResponseBody
    public ResponseEntity updateList(@RequestBody List<AboutDTO> aboutListDTO){
        for(AboutDTO aboutDTO : aboutListDTO){
         aboutService.update(aboutMapper.toEntity(aboutDTO));   
        }
        return new ResponseEntity<>(getAll(), HttpStatus.OK);
    }
    
    @DeleteMapping("/delete/{id}")
    @CrossOrigin(origins = "${cross.origin.value}")
    @ResponseBody
    public ResponseEntity delete(@PathVariable Long id){  
        if(!aboutService.delete(id)){
            return new ResponseEntity<>("Error: Not Deleted", HttpStatus.CONFLICT);
        }
        return new ResponseEntity<>(getAll(), HttpStatus.OK);
    }
    
}