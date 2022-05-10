package com.gottig.portfolio.controller;

import com.gottig.portfolio.model.MyUser;
import com.gottig.portfolio.service.classes.UserService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PutMapping;


@RestController
public class UserController {
    
    private final String CROSSORIGIN = "http://localhost:4200";
    
    @Autowired
    private UserService userService;
    
    @GetMapping("/user/list")
    @CrossOrigin(origins = CROSSORIGIN)
    @ResponseBody
    public List<MyUser> getAll(){
        return userService.getAll();
    }
    
    @PostMapping("/user/create")
    @CrossOrigin(origins = CROSSORIGIN)
    @ResponseBody
    public String create(@RequestBody MyUser user){
        userService.create(user);
        return "User created";
    }
    
    @DeleteMapping("/user/delete")
    @CrossOrigin(origins = CROSSORIGIN)
    @ResponseBody
    public String delete(@RequestBody MyUser user){  
        Long id = user.getUserId();
        System.out.println(id);
        userService.delete(id);
        return "User deleted";
    }
    
    @PutMapping("/user/update")
    @CrossOrigin(origins = CROSSORIGIN)
    @ResponseBody
    public String update(@RequestBody MyUser user){  
        Long id = user.getUserId();
        if(id != null){
            MyUser currentUser;
            currentUser = (MyUser)userService.getOne(id);
            if(currentUser != null){
                userService.create(user); // Solo existe el método save() para crear y para modificar.  
                return "User updated";
            }else{
                return "User not found";
            }
        }else{
            return "Id missing";
        }
    }
}