package com.gottig.portfolio.controller;

import com.gottig.portfolio.model.JobExperience;
import com.gottig.portfolio.service.classes.JobExperienceService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;


@RestController
public class JobExperienceController {
    
    @Autowired
    private JobExperienceService jobService;
    
    @GetMapping("/job-experience/list")
    @ResponseBody
    public List<JobExperience> getAll(){
        return jobService.getAll();
    }
    
    @PostMapping("/job-experience/create")
    @ResponseBody
    public String create(@RequestBody JobExperience jobExp){
        jobService.create(jobExp);
        return "Job Experience created";
    }
    
    @DeleteMapping("/job-experience/delete")
    @ResponseBody
    public JobExperience delete(@RequestBody JobExperience jobId){  
        //Long id = jobId.getJobId();
        System.out.println(jobId.getJobId());
        jobService.delete(jobId.getJobId());
        return jobId;
    }
    
    @PutMapping("/job-experience/update")
    @ResponseBody
    public String update(@RequestBody JobExperience jobExp){  
        Long id = jobExp.getJobId();
        if(id != null){
            JobExperience currentJob;
            currentJob = (JobExperience)jobService.getOne(id);
            if(currentJob != null){
                jobService.create(jobExp); // Solo existe el método save() para crear y para modificar.  
                return "Job Experience updated";
            }else{
                return "Job Experience not found";
            }
        }else{
            return "Id missing";
        }
    }
    
}
