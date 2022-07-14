package com.gottig.portfolio.controller;

import com.gottig.portfolio.dto.dtomodel.SkillDTO;
import com.gottig.portfolio.dto.mapperinteface.CommonMapper;
import com.gottig.portfolio.model.Skill;
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
@RequestMapping("skill")
public class SkillController {
    
    @Autowired
    private CRUDServiceInterface<Skill> skillService;
    
    @Autowired
    private CommonMapper<SkillDTO, Skill> skillMapper;
    
    
    @Operation(summary = "List of all Skill")
    @ApiResponses(value = { 
        @ApiResponse(responseCode = "200", description = "List of Skill", 
        content = { @Content(mediaType = "application/json", 
        schema = @Schema(implementation = SkillDTO.class)) }),
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
    
    
    @Operation(summary = "Get a Skill by its id")
    @ApiResponses(value = { 
        @ApiResponse(responseCode = "200", description = "Get Skill", 
        content = { @Content(mediaType = "application/json", 
        schema = @Schema(implementation = SkillDTO.class)) }),
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
    
    
    @Operation(summary = "Create Skill")
    @ApiResponses(value = { 
        @ApiResponse(responseCode = "200", description = "Create Skill", 
        content = { @Content(mediaType = "application/json", 
        schema = @Schema(implementation = SkillDTO.class)) }),
    @ApiResponse(responseCode = "401", description = "Not Authorized", 
        content = @Content),
    @ApiResponse(responseCode = "400", description = "Bad request", 
        content = @Content),
    @ApiResponse(responseCode = "500", description = "Database error", 
        content = @Content) })
    @PostMapping
    @CrossOrigin(origins = "${cross.origin.value}")
    @ResponseBody
    public ResponseEntity create(@RequestBody SkillDTO skillDTO){
        if(!skillService.create(skillMapper.toEntity(skillDTO))){
            return new ResponseEntity<>("Skill Not Created", HttpStatus.BAD_REQUEST);
        }
        return getList();
    }
    
    
    @Operation(summary = "Update Skill")
    @ApiResponses(value = { 
        @ApiResponse(responseCode = "200", description = "Update Skill", 
        content = { @Content(mediaType = "application/json", 
        schema = @Schema(implementation = SkillDTO.class)) }),
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
    public ResponseEntity update(@RequestBody SkillDTO skillDTO){
        if(!skillService.update(skillMapper.toEntity(skillDTO))){
            return new ResponseEntity<>("Skill Not Updated", HttpStatus.NOT_MODIFIED);
        }
        return singleGet(skillDTO.getSkillId());
    }
    
    
    @Operation(summary = "Update List of Skill")
    @ApiResponses(value = { 
        @ApiResponse(responseCode = "200", description = "Update List of Skill", 
        content = { @Content(mediaType = "application/json", 
        schema = @Schema(implementation = SkillDTO.class)) }),
    @ApiResponse(responseCode = "401", description = "Not Authorized", 
        content = @Content),
    @ApiResponse(responseCode = "400", description = "Bad request", 
        content = @Content),
    @ApiResponse(responseCode = "500", description = "Database error", 
        content = @Content) })
    @PutMapping("/list")
    @CrossOrigin(origins = "${cross.origin.value}")
    @ResponseBody
    public ResponseEntity updateList(@RequestBody List<SkillDTO> skillListDTO){
        for(SkillDTO skillDTO : skillListDTO){
            if(!skillService.update(skillMapper.toEntity(skillDTO))){
                return new ResponseEntity<>("Skill Not Updated", HttpStatus.NOT_MODIFIED);
            }
        }
        return getList();
    }
    
    
    @Operation(summary = "Delete Skill")
    @ApiResponses(value = { 
        @ApiResponse(responseCode = "200", description = "Delete Skill", 
        content = { @Content(mediaType = "application/json", 
        schema = @Schema(implementation = SkillDTO.class)) }),
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
        if(!skillService.delete(id)){
            return new ResponseEntity<>("Skill Not Deleted", HttpStatus.CONFLICT);
        }
        return getList();
    }
    
    
    public ResponseEntity getList(){
        List<SkillDTO> list = skillMapper.toDtoAll(skillService.getAll());
        if(list.size()<1){
            return new ResponseEntity<>("Skill List Empty", HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(list, HttpStatus.OK);
    }
    
    public ResponseEntity singleGet(Long id){
        SkillDTO obj= skillMapper.toDto(skillService.getOne(id));
        if(obj == null){
            return new ResponseEntity<>("Skill Not Found", HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(obj, HttpStatus.OK);
    }
    
}
