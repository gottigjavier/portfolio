package com.gottig.portfolio.controller;

import com.gottig.portfolio.dto.dtomodel.SpokenLangDTO;
import com.gottig.portfolio.dto.mapperinteface.CommonMapper;
import com.gottig.portfolio.model.SpokenLang;
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
@RequestMapping("spoken-language")
public class SpokenLangController {
    
    @Autowired
    private CRUDServiceInterface<SpokenLang> langService;
    
    @Autowired
    private CommonMapper<SpokenLangDTO, SpokenLang> langMapper;
    
    @GetMapping("/list")
    @CrossOrigin(origins = "${cross.origin.value}")
    @ResponseBody
    public List<SpokenLangDTO> getAll(){
        return langMapper.toDtoAll(langService.getAll());
    }
    
    @GetMapping("/{id}")
    @CrossOrigin(origins = "${cross.origin.value}")
    @ResponseBody
    public SpokenLangDTO getOne(@PathVariable Long id){
        return langMapper.toDto(langService.getOne(id));
    }
    
    
    @PostMapping("/create")
    @CrossOrigin(origins = "${cross.origin.value}")
    @ResponseBody
    public boolean create(@RequestBody SpokenLangDTO langDTO){
        return langService.create(langMapper.toEntity(langDTO));
    }
    
    @PutMapping("/update")
    @CrossOrigin(origins = "${cross.origin.value}")
    @ResponseBody
    public boolean update(@RequestBody SpokenLangDTO langDTO){
        return langService.update(langMapper.toEntity(langDTO));
    }
    
    @DeleteMapping("/delete/{id}")
    @CrossOrigin(origins = "${cross.origin.value}")
    @ResponseBody
    public boolean delete(@PathVariable Long id){  
        return langService.delete(id);
    }
    
}
