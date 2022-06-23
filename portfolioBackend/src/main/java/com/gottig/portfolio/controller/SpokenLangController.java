package com.gottig.portfolio.controller;

import com.gottig.portfolio.dto.dtomodel.SpokenLangDTO;
import com.gottig.portfolio.dto.mapperinteface.CommonMapper;
import com.gottig.portfolio.model.SpokenLang;
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
@RequestMapping("spoken-language")
public class SpokenLangController {
    
    @Autowired
    private CRUDServiceInterface<SpokenLang> langService;
    
    @Autowired
    private CommonMapper<SpokenLangDTO, SpokenLang> langMapper;
    
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
    public ResponseEntity create(@RequestBody SpokenLangDTO langDTO){
        if(!langService.create(langMapper.toEntity(langDTO))){
            return new ResponseEntity<>("Spoken Language Not Created", HttpStatus.BAD_REQUEST);
        }
        return getList();
    }
    
    @PutMapping("/update")
    @CrossOrigin(origins = "${cross.origin.value}")
    @ResponseBody
    public ResponseEntity update(@RequestBody SpokenLangDTO langDTO){
        if(!langService.update(langMapper.toEntity(langDTO))){
            return new ResponseEntity<>("Spoken Language Not Updated", HttpStatus.NOT_MODIFIED);
        }
        return singleGet(langDTO.getLanguageId());
    }
    
    @PutMapping("/update/list")
    @CrossOrigin(origins = "${cross.origin.value}")
    @ResponseBody
    public ResponseEntity updateList(@RequestBody List<SpokenLangDTO> langListDTO){
        for(SpokenLangDTO langDTO : langListDTO){
            if(!langService.update(langMapper.toEntity(langDTO))){
                return new ResponseEntity<>("Spoken Language Not Updated", HttpStatus.NOT_MODIFIED);
            }   
        }
        return getList();
    }
    
    @DeleteMapping("/delete/{id}")
    @CrossOrigin(origins = "${cross.origin.value}")
    @ResponseBody
    public ResponseEntity delete(@PathVariable Long id){  
        if(!langService.delete(id)){
            return new ResponseEntity<>("Spoken Language Not Deleted", HttpStatus.CONFLICT);
        }
        return getList();
    }
    
    public ResponseEntity getList(){
        List<SpokenLangDTO> list = langMapper.toDtoAll(langService.getAll());
        if(list.size()<1){
            return new ResponseEntity<>("Spoken Language List Empty", HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(list, HttpStatus.OK);
    }
    
    public ResponseEntity singleGet(Long id){
        SpokenLangDTO obj= langMapper.toDto(langService.getOne(id));
        if(obj == null){
            return new ResponseEntity<>("Spoken Language Not Found", HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(obj, HttpStatus.OK);
    }
    
}
