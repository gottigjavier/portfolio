package com.gottig.portfolio.controller;

import com.gottig.portfolio.model.MyUser;
import com.gottig.portfolio.service.interfaces.IUserService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;


/**
 *
 * @author gottig
 */
@RestController
public class UserController {
    
    //List<User> users = new ArrayList();
    
    @Autowired
    private IUserService userService;
    
    /**
     *
     * @return
     */
    @GetMapping("/user/list")
    @CrossOrigin(origins = "http://localhost:4200")
    @ResponseBody
    public List<MyUser> getAllUsers(){
        return userService.getAllUsers();
    }
    
    /**
     *
     * @param user
     * @return 
     */
    @PostMapping("/user/create")
    @ResponseBody
    public String createUser(@RequestBody MyUser user){
        userService.createUser(user);
        return "User created";
    }
    
    /**
     *
     * @param user
     * @return
     */
    @DeleteMapping("/user/delete")
    @ResponseBody
    public MyUser deleteUser(@RequestBody MyUser user){  
        Long id = user.getUserId();
        System.out.println(id);
        userService.deleteUser(id);
        return user;
    }
    
}
