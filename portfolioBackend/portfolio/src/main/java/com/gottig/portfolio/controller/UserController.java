package com.gottig.portfolio.controller;

import com.gottig.portfolio.model.MyUser;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import com.gottig.portfolio.service.crudinterface.CRUDServiceInterface;


/**
 *
 * @author gottig
 */
@RestController
public class UserController {
    
    @Autowired
    private CRUDServiceInterface userService;
    
    @GetMapping("/user/list")
    @CrossOrigin(origins = "http://localhost:4200")
    @ResponseBody
    public List<MyUser> getAll(){
        return userService.getAll();
    }
    
    @PostMapping("/user/create")
    @ResponseBody
    public String create(@RequestBody MyUser user){
        userService.create(user);
        return "User created";
    }
    
    @DeleteMapping("/user/delete")
    @ResponseBody
    public MyUser delete(@RequestBody MyUser user){  
        Long id = user.getUserId();
        System.out.println(id);
        userService.delete(id);
        return user;
    }
    
}
