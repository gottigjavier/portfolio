package com.gottig.portfolio.controller;

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
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;



@RestController
public class MyProjectController {
    
    @Autowired
    private MyProjectService myProjectService;
    
    @GetMapping("/my-project/list")
    @CrossOrigin(origins = "http://localhost:4200")
    @ResponseBody
    public List<MyProject> getAll(){
        return myProjectService.getAll();
    }
    
    @PostMapping("/my-project/create")
    @ResponseBody
    public String create(@RequestBody MyProject myProject){
        myProjectService.create(myProject);
        return "MyProject created";
    }
    
    @DeleteMapping("/my-project/delete")
    @ResponseBody
    public String delete(@RequestBody MyProject myProject){  
        Long id = myProject.getProjId();
        System.out.println(id);
        myProjectService.delete(id);
        return "MyProject deleted";
    }
    
    @PutMapping("/my-project/update")
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
