package com.gottig.portfolio.controller;

import com.gottig.portfolio.dto.classes.TechnologyDTO;
import com.gottig.portfolio.dto.mapperintefaces.CommonMapper;
import com.gottig.portfolio.model.Technology;
import com.gottig.portfolio.service.crudinterface.CRUDServiceInterface;
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
    private CRUDServiceInterface<Technology> technologyService;
    
    @Autowired
    private CommonMapper<TechnologyDTO, Technology> technologyMapper;
    
    @GetMapping("/list")
    @CrossOrigin(origins = CROSSORIGIN)
    @ResponseBody
    public List<TechnologyDTO> getAll(){
        return technologyMapper.toDtoAll(technologyService.getAll());
    }
    
    @PostMapping("/create")
    @CrossOrigin(origins = CROSSORIGIN)
    @ResponseBody
    public TechnologyDTO create(@RequestBody TechnologyDTO techDTO){
        Technology technology =technologyMapper.toEntity(techDTO); 
        technologyService.create(technology);
        return technologyMapper.toDto(technologyService.getOne(techDTO.getTechId()));
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
    public TechnologyDTO update(@RequestBody TechnologyDTO techDTO){  
        Long id = techDTO.getTechId();
            technologyService.update(technologyMapper.toEntity(techDTO)); // Solo existe el método save() para crear y para modificar.  
            return technologyMapper.toDto(technologyService.getOne(id));
    }
    
}
