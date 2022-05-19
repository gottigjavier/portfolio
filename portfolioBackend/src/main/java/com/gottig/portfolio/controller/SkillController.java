package com.gottig.portfolio.controller;

import com.gottig.portfolio.dto.dtomodel.SkillDTO;
import com.gottig.portfolio.dto.mapperinteface.CommonMapper;
import com.gottig.portfolio.model.Skill;
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
@RequestMapping("skill")
public class SkillController {
    
    private final String CROSSORIGIN = "http://localhost:4200";
    
    @Autowired
    private CRUDServiceInterface<Skill> skillService;
    
    @Autowired
    private CommonMapper<SkillDTO, Skill> skillMapper;
    
    @GetMapping("/list")
    @CrossOrigin(origins = CROSSORIGIN)
    @ResponseBody
    public List<SkillDTO> getAll(){
        return skillMapper.toDtoAll(skillService.getAll());
    }
    
    @GetMapping("/{id}")
    @CrossOrigin(origins = CROSSORIGIN)
    @ResponseBody
    public SkillDTO getOne(@PathVariable Long id){
        return skillMapper.toDto(skillService.getOne(id));
    }
    
    @PostMapping("/create")
    @CrossOrigin(origins = CROSSORIGIN)
    @ResponseBody
    public boolean create(@RequestBody SkillDTO skillDTO){
        return skillService.create(skillMapper.toEntity(skillDTO));
    }
    
    @PutMapping("/update")
    @CrossOrigin(origins = CROSSORIGIN)
    @ResponseBody
    public boolean update(@RequestBody SkillDTO skillDTO){
        return skillService.update(skillMapper.toEntity(skillDTO));
    }
    
    @DeleteMapping("/delete/{id}")
    @CrossOrigin(origins = CROSSORIGIN)
    @ResponseBody
    public boolean delete(@PathVariable Long id){
        return skillService.delete(id);
    }
    
}
