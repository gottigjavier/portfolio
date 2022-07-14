package com.gottig.portfolio.controller;

import com.gottig.portfolio.dto.dtomodel.JobExperienceDTO;
import com.gottig.portfolio.dto.mapperinteface.CommonMapper;
import com.gottig.portfolio.model.JobExperience;
import com.gottig.portfolio.service.crudinterface.CRUDServiceInterface;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
    
    
    @Operation(summary = "List of all Job Experience")
    @ApiResponses(value = { 
        @ApiResponse(responseCode = "200", description = "List of Job Experience", 
        content = { @Content(mediaType = "application/json", 
        schema = @Schema(implementation = JobExperienceDTO.class)) }),
    @ApiResponse(responseCode = "400", description = "Bad request", 
        content = @Content), 
    @ApiResponse(responseCode = "500", description = "Database error", 
        content = @Content) })
    @GetMapping("/list")
    @CrossOrigin(origins = "${cross.origin.value}")
    @ResponseBody
    public ResponseEntity getAll(){
        return getList();
    }
    
    
    @Operation(summary = "Get a Job Experience by its id")
    @ApiResponses(value = { 
        @ApiResponse(responseCode = "200", description = "Get Job Experience", 
        content = { @Content(mediaType = "application/json", 
        schema = @Schema(implementation = JobExperienceDTO.class)) }),
    @ApiResponse(responseCode = "401", description = "Not Authorized", 
        content = @Content), 
    @ApiResponse(responseCode = "404", description = "Not found", 
        content = @Content) })
    @GetMapping("/{id}")
    @CrossOrigin(origins = "${cross.origin.value}")
    @ResponseBody
    public ResponseEntity getOne(@PathVariable Long id){
        return singleGet(id);
    }
    
    
    @Operation(summary = "Create JobExperience")
    @ApiResponses(value = { 
        @ApiResponse(responseCode = "200", description = "Create JobExperience", 
        content = { @Content(mediaType = "application/json", 
        schema = @Schema(implementation = JobExperienceDTO.class)) }),
    @ApiResponse(responseCode = "401", description = "Not Authorized", 
        content = @Content),
    @ApiResponse(responseCode = "400", description = "Bad request", 
        content = @Content),
    @ApiResponse(responseCode = "500", description = "Database error", 
        content = @Content) })
    @PostMapping
    @CrossOrigin(origins = "${cross.origin.value}")
    @ResponseBody
    public ResponseEntity create(@RequestBody JobExperienceDTO jobDTO){
        if(!jobService.create(jobMapper.toEntity(jobDTO))){
            return new ResponseEntity<>("Job Experience Not Created", HttpStatus.BAD_REQUEST);
        }
        return getList();
    }
    
    
    @Operation(summary = "Update JobExperience")
    @ApiResponses(value = { 
        @ApiResponse(responseCode = "200", description = "Update JobExperience", 
        content = { @Content(mediaType = "application/json", 
        schema = @Schema(implementation = JobExperienceDTO.class)) }),
    @ApiResponse(responseCode = "401", description = "Not Authorized", 
        content = @Content),
    @ApiResponse(responseCode = "400", description = "Bad request", 
        content = @Content),
    @ApiResponse(responseCode = "404", description = "Not found", 
        content = @Content),
    @ApiResponse(responseCode = "500", description = "Database error", 
        content = @Content) })
    @PutMapping
    @CrossOrigin(origins = "${cross.origin.value}")
    @ResponseBody
    public ResponseEntity update(@RequestBody JobExperienceDTO jobDTO){
        if(!jobService.update(jobMapper.toEntity(jobDTO))){
            return new ResponseEntity<>("Job Experience Not Updated", HttpStatus.NOT_MODIFIED);
        }
        return singleGet(jobDTO.getJobId());
    }
    
    
    @Operation(summary = "Update List of JobExperience")
    @ApiResponses(value = { 
        @ApiResponse(responseCode = "200", description = "Update List of JobExperience", 
        content = { @Content(mediaType = "application/json", 
        schema = @Schema(implementation = JobExperienceDTO.class)) }),
    @ApiResponse(responseCode = "401", description = "Not Authorized", 
        content = @Content),
    @ApiResponse(responseCode = "400", description = "Bad request", 
        content = @Content),
    @ApiResponse(responseCode = "500", description = "Database error", 
        content = @Content) })
    @PutMapping("/list")
    @CrossOrigin(origins = "${cross.origin.value}")
    @ResponseBody
    public ResponseEntity updateList(@RequestBody List<JobExperienceDTO> jobListDTO){
        for(JobExperienceDTO jobDTO : jobListDTO){
            if(!jobService.update(jobMapper.toEntity(jobDTO))){
                return new ResponseEntity<>("Job Experience Not Updated", HttpStatus.NOT_MODIFIED);
            }   
        }
        return getList();
    }
    
    
    @Operation(summary = "Delete JobExperience")
    @ApiResponses(value = { 
        @ApiResponse(responseCode = "200", description = "Delete JobExperience", 
        content = { @Content(mediaType = "application/json", 
        schema = @Schema(implementation = JobExperienceDTO.class)) }),
    @ApiResponse(responseCode = "401", description = "Not Authorized", 
        content = @Content),
    @ApiResponse(responseCode = "400", description = "Bad request", 
        content = @Content),
    @ApiResponse(responseCode = "404", description = "Not found", 
        content = @Content),
    @ApiResponse(responseCode = "500", description = "Database error", 
        content = @Content) })
    @DeleteMapping("/{id}")
    @CrossOrigin(origins = "${cross.origin.value}")
    @ResponseBody
    public ResponseEntity delete(@PathVariable Long id){  
        if(!jobService.delete(id)){
            return new ResponseEntity<>("Job Experience Not Deleted", HttpStatus.CONFLICT);
        }
        return getList();
    }
    
    
    public ResponseEntity getList(){
        List<JobExperienceDTO> list = jobMapper.toDtoAll(jobService.getAll());
        if(list.size()<1){
            return new ResponseEntity<>("Job Experience List Empty", HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(list, HttpStatus.OK);
    }
    
    public ResponseEntity singleGet(Long id){
        JobExperienceDTO obj= jobMapper.toDto(jobService.getOne(id));
        if(obj == null){
            return new ResponseEntity<>("Job Experience Not Found", HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(obj, HttpStatus.OK);
    }
    
}
