package com.gottig.portfolio.controller;

import com.gottig.portfolio.model.About;
import com.gottig.portfolio.model.MyUser;
import com.gottig.portfolio.service.interfaces.IAboutService;
import com.gottig.portfolio.service.interfaces.IUserService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
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
public class AboutController {
    
    @Autowired
    private IAboutService aboutService;
        
    /**
     *
     * @return
     */
    @GetMapping("/about/list")
    @ResponseBody
    public List<About> getAllAbout(){
        return aboutService.getAllAbout();
    }
    
    /**
     *
     * @param about
     * @return 
     */
    @PostMapping("/about/create")
    @ResponseBody
    public String createAbout(@RequestBody About about){
        aboutService.createAbout(about);
        return "About created";
    }
    
    /**
     *
     * @param aboutId
     * @return
     */
    @DeleteMapping("/about/delete")
    @ResponseBody
    public About deleteAbout(@RequestBody About aboutId){  
        Long id = aboutId.getAboutId();
        System.out.println(id);
        aboutService.deleteAbout(id);
        return aboutId;
    }
}
