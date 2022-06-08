package com.gottig.portfolio.controller;

import com.gottig.portfolio.dto.dtomodel.JobExperienceDTO;
import com.gottig.portfolio.dto.mapperinteface.CommonMapper;
import com.gottig.portfolio.model.JobExperience;
import com.gottig.portfolio.service.crudinterface.CRUDServiceInterface;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("job-experience")
public class JobExperienceController {
    
    @Autowired
    private CRUDServiceInterface<JobExperience> jobService;
    
    @Autowired
    private CommonMapper<JobExperienceDTO, JobExperience> jobMapper;
    
    @GetMapping("/list")
    @CrossOrigin(origins = "${cross.origin.value}")
    @ResponseBody
    public List<JobExperienceDTO> getAll(){
        return jobMapper.toDtoAll(jobService.getAll());
    }
    
    @GetMapping("/{id}")
    @CrossOrigin(origins = "${cross.origin.value}")
    @ResponseBody
    public JobExperienceDTO getOne(@PathVariable Long id){
        return jobMapper.toDto(jobService.getOne(id));
    }
    
    @PostMapping("/create")
    @CrossOrigin(origins = "${cross.origin.value}")
    @ResponseBody
    public boolean create(@RequestBody JobExperienceDTO jobDTO){
        return jobService.create(jobMapper.toEntity(jobDTO));
    }
    
    @PutMapping("/update")
    @CrossOrigin(origins = "${cross.origin.value}")
    @ResponseBody
    public boolean update(@RequestBody JobExperienceDTO jobDTO){
        return jobService.update(jobMapper.toEntity(jobDTO));
    }
    
    @DeleteMapping("/delete/{id}")
    @CrossOrigin(origins = "${cross.origin.value}")
    @ResponseBody
    public boolean delete(@PathVariable Long id){  
        return jobService.delete(id);
    }
    
}
