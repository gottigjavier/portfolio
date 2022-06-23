package com.gottig.portfolio.controller;

import com.gottig.portfolio.dto.dtomodel.SkillDTO;
import com.gottig.portfolio.dto.mapperinteface.CommonMapper;
import com.gottig.portfolio.model.Skill;
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
@RequestMapping("skill")
public class SkillController {
    
    @Autowired
    private CRUDServiceInterface<Skill> skillService;
    
    @Autowired
    private CommonMapper<SkillDTO, Skill> skillMapper;
    
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
    public ResponseEntity create(@RequestBody SkillDTO skillDTO){
        if(!skillService.create(skillMapper.toEntity(skillDTO))){
            return new ResponseEntity<>("Skill Not Created", HttpStatus.BAD_REQUEST);
        }
        return getList();
    }
    
    @PutMapping("/update")
    @CrossOrigin(origins = "${cross.origin.value}")
    @ResponseBody
    public ResponseEntity update(@RequestBody SkillDTO skillDTO){
        if(!skillService.update(skillMapper.toEntity(skillDTO))){
            return new ResponseEntity<>("Skill Not Updated", HttpStatus.NOT_MODIFIED);
        }
        return singleGet(skillDTO.getSkillId());
    }
    
    @PutMapping("/update/list")
    @CrossOrigin(origins = "${cross.origin.value}")
    @ResponseBody
    public ResponseEntity updateList(@RequestBody List<SkillDTO> skillListDTO){
        for(SkillDTO skillDTO : skillListDTO){
            if(!skillService.update(skillMapper.toEntity(skillDTO))){
                return new ResponseEntity<>("Skill Not Updated", HttpStatus.NOT_MODIFIED);
            }
        }
        return getList();
    }
    
    @DeleteMapping("/delete/{id}")
    @CrossOrigin(origins = "${cross.origin.value}")
    @ResponseBody
    public ResponseEntity delete(@PathVariable Long id){  
        if(!skillService.delete(id)){
            return new ResponseEntity<>("Skill Not Deleted", HttpStatus.CONFLICT);
        }
        return getList();
    }
    
    
    public ResponseEntity getList(){
        List<SkillDTO> list = skillMapper.toDtoAll(skillService.getAll());
        if(list.size()<1){
            return new ResponseEntity<>("Skill List Empty", HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(list, HttpStatus.OK);
    }
    
    public ResponseEntity singleGet(Long id){
        SkillDTO obj= skillMapper.toDto(skillService.getOne(id));
        if(obj == null){
            return new ResponseEntity<>("Skill Not Found", HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(obj, HttpStatus.OK);
    }
    
}
