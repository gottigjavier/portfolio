package com.gottig.portfolio.controller;

import com.gottig.portfolio.dto.classes.TechnologyDTO;
import com.gottig.portfolio.dto.mapperintefaces.TechnologyMapper;
import com.gottig.portfolio.model.Technology;
import com.gottig.portfolio.service.classes.TechnologyService;
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


@RestController
@RequestMapping("technology")
public class TechnologyController {
    
    private final String CROSSORIGIN = "http://localhost:4200";
    
    @Autowired
    private TechnologyService technologyService;
    
    @Autowired
    private TechnologyMapper technologyMapper;
    
    @GetMapping("/list")
    @CrossOrigin(origins = CROSSORIGIN)
    @ResponseBody
    public List<TechnologyDTO> getAll(){
        return technologyMapper.toDtoAll(technologyService.getAll());
    }
    
    @PostMapping("/create")
    @CrossOrigin(origins = CROSSORIGIN)
    @ResponseBody
    public String create(@RequestBody Technology technology){
        technologyService.create(technology);
        return "Technology created";
    }
    
    @DeleteMapping("/delete")
    @CrossOrigin(origins = CROSSORIGIN)
    @ResponseBody
    public String delete(@RequestBody Technology technology){  
        Long id = technology.getTechId();
        System.out.println(id);
        technologyService.delete(id);
        return "Technology deleted";
    }
    
    @PutMapping("/update")
    @CrossOrigin(origins = CROSSORIGIN)
    @ResponseBody
    public String update(@RequestBody TechnologyDTO technology){  
        Long id = technology.getTechId();
        if(id != null){
            return technologyService.update(technologyMapper.toEntity(technology)); // Solo existe el método save() para crear y para modificar.  
        }else{
            return "Id missing";
        }
    }
    
}
