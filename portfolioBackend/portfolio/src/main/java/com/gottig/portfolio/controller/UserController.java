package com.gottig.portfolio.controller;

import com.gottig.portfolio.model.MyUser;
import com.gottig.portfolio.service.user.IUserService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {
    
    //List<User> users = new ArrayList();
    
    @Autowired
    private IUserService userService;
    
    @GetMapping("/user/list")
    @ResponseBody
    public List<MyUser> getAllUsers(){
        return userService.getAllUsers();
    }
    
    @PostMapping("/user/create")
    public void createUser(@RequestBody MyUser user){
        userService.createUser(user);
    }
    
    @DeleteMapping("/user/delete")
    @ResponseBody
    public MyUser deleteUser(@RequestBody MyUser user){  
        Long id = user.getUserId();
        System.out.println(id);
        userService.deleteUser(id);
        return user;
    }
    
}
