package com.gottig.portfolio.controller;

import com.gottig.portfolio.dto.classes.MyProjectDTO;
import com.gottig.portfolio.model.MyProject;
import com.gottig.portfolio.service.classes.MyProjectService;
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
import com.gottig.portfolio.dto.mapperintefaces.MyProjectMapper;



@RestController
@RequestMapping("my-project")
public class MyProjectController {
    
    private final String CROSSORIGIN = "http://localhost:4200";
    
    @Autowired
    private MyProjectService myProjectService;
    
    @Autowired
    private MyProjectMapper projectAndTech;
    
    @GetMapping("/list")
    @CrossOrigin(origins = CROSSORIGIN)
    @ResponseBody
    public List<MyProjectDTO> getAll(){
        return projectAndTech.toDtoAll(myProjectService.getAll());
    }
    
    @PostMapping("/create")
    @CrossOrigin(origins = CROSSORIGIN)
    @ResponseBody
    public String create(@RequestBody MyProject myProject){
        myProjectService.create(myProject);
        return "MyProject created";
    }
    
    @DeleteMapping("/delete")
    @CrossOrigin(origins = CROSSORIGIN)
    @ResponseBody
    public String delete(@RequestBody MyProject myProject){  
        Long id = myProject.getProjId();
        System.out.println(id);
        myProjectService.delete(id);
        return "MyProject deleted";
    }
    
    @PutMapping("/update")
    @CrossOrigin(origins = CROSSORIGIN)
    @ResponseBody
    public String update(@RequestBody MyProject myProject){  
        Long id = myProject.getProjId();
        if(id != null){
            MyProject currentMyProject;
            currentMyProject = (MyProject)myProjectService.getOne(id);
            if(currentMyProject != null){
                myProjectService.create(myProject); // Solo existe el método save() para crear y para modificar.  
                return "MyProject updated";
            }else{
                return "MyProject not found";
            }
        }else{
            return "Id missing";
        }
    }
    
}
