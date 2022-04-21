package com.gottig.portfolio.controller;

import com.gottig.portfolio.model.About;
import com.gottig.portfolio.service.about.IAboutService;
import static java.lang.Integer.parseInt;
import static java.lang.Long.parseLong;
import java.util.Arrays;
import java.util.List;
import net.minidev.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;


@RestController
public class AboutController {
    
    @Autowired
    private IAboutService aboutService;
    
    @GetMapping("/about/list")
    @ResponseBody
    public List<About> getAllAbout(){
        return aboutService.getAllAbout();
    }
    
    @PostMapping("/about/create")
    public void createAbout(@RequestBody About about){
        aboutService.createAbout(about);
    }
    
     JSONObject idd = new JSONObject();
    @DeleteMapping("/about/delete")
    @ResponseBody
    public About deleteAbout(@RequestBody About aboutId){  
        Long id = aboutId.getAboutId();
        System.out.println(id);
        aboutService.deleteAbout(id);
        return aboutId;
    }
}
