package com.gottig.portfolio.controller;

import com.gottig.portfolio.dto.dtomodel.TechnologyDTO;
import com.gottig.portfolio.dto.mapperinteface.CommonMapper;
import com.gottig.portfolio.model.About;
import com.gottig.portfolio.model.MyProject;
import com.gottig.portfolio.model.Technology;
import com.gottig.portfolio.service.crudinterface.CRUDServiceInterface;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import java.util.List;
import java.util.Objects;
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
@RequestMapping("technology")
public class TechnologyController {
    
    @Autowired
    private CRUDServiceInterface<Technology> techService;
    
    @Autowired
    private CommonMapper<TechnologyDTO, Technology> techMapper;
    
    @Autowired
    private CRUDServiceInterface<MyProject> projService;
    
    
    @Operation(summary = "List of all Technology")
    @ApiResponses(value = { 
        @ApiResponse(responseCode = "200", description = "List of Technology", 
        content = { @Content(mediaType = "application/json", 
        schema = @Schema(implementation = TechnologyDTO.class)) }),
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
    
    
    @Operation(summary = "Get a Technology by its id")
    @ApiResponses(value = { 
        @ApiResponse(responseCode = "200", description = "Get Technology", 
        content = { @Content(mediaType = "application/json", 
        schema = @Schema(implementation = TechnologyDTO.class)) }),
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
    
    
    @Operation(summary = "Create Technology")
    @ApiResponses(value = { 
        @ApiResponse(responseCode = "200", description = "Create Technology", 
        content = { @Content(mediaType = "application/json", 
        schema = @Schema(implementation = TechnologyDTO.class)) }),
    @ApiResponse(responseCode = "401", description = "Not Authorized", 
        content = @Content),
    @ApiResponse(responseCode = "400", description = "Bad request", 
        content = @Content),
    @ApiResponse(responseCode = "500", description = "Database error", 
        content = @Content) })
    @PostMapping
    @CrossOrigin(origins = "${cross.origin.value}")
    @ResponseBody
    public ResponseEntity create(@RequestBody TechnologyDTO techDTO){
        if(!techService.create(techMapper.toEntity(techDTO))){
            return new ResponseEntity<>("Technology Not Created", HttpStatus.BAD_REQUEST);
        }
        return getList();
    }
    
    
    @Operation(summary = "Update Technology")
    @ApiResponses(value = { 
        @ApiResponse(responseCode = "200", description = "Update Technology", 
        content = { @Content(mediaType = "application/json", 
        schema = @Schema(implementation = TechnologyDTO.class)) }),
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
    public ResponseEntity update(@RequestBody TechnologyDTO techDTO){  
        if(!techService.update(techMapper.toEntity(techDTO))){
            return new ResponseEntity<>("Technology Not Updated", HttpStatus.NOT_MODIFIED);
        }
        return singleGet(techDTO.getTechId());
    }
    
    
    @Operation(summary = "Update List of Technology")
    @ApiResponses(value = { 
        @ApiResponse(responseCode = "200", description = "Update List of Technology", 
        content = { @Content(mediaType = "application/json", 
        schema = @Schema(implementation = TechnologyDTO.class)) }),
    @ApiResponse(responseCode = "401", description = "Not Authorized", 
        content = @Content),
    @ApiResponse(responseCode = "400", description = "Bad request", 
        content = @Content),
    @ApiResponse(responseCode = "500", description = "Database error", 
        content = @Content) })
    @PutMapping("/list")
    @CrossOrigin(origins = "${cross.origin.value}")
    @ResponseBody
    public ResponseEntity updateList(@RequestBody List<TechnologyDTO> techListDTO){
        for(TechnologyDTO techDTO : techListDTO){
            if(!techService.update(techMapper.toEntity(techDTO))){
                return new ResponseEntity<>("Technology Not Updated", HttpStatus.NOT_MODIFIED);
            }
        }
        return getList();
    }
    
    
    @Operation(summary = "Delete Technology")
    @ApiResponses(value = { 
        @ApiResponse(responseCode = "200", description = "Delete Technology", 
        content = { @Content(mediaType = "application/json", 
        schema = @Schema(implementation = TechnologyDTO.class)) }),
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
        List<MyProject> projList;
        projList = projService.getAll();
        for (MyProject proj: projList){
            List<Technology> techList = proj.getTechList();
            for(Technology tech : techList){
                if(Objects.equals(tech.getTechId(), id)){
                    proj.removeTech(tech);
                    projService.update(proj);
                    break;
                }
            }
        }
        if(!techService.delete(id)){
         return new ResponseEntity<>("Technology Not Deleted", HttpStatus.CONFLICT);   
        }
        return getList();  
    }
    
    
    public ResponseEntity getList(){
        List<TechnologyDTO> list = techMapper.toDtoAll(techService.getAll());
        if(list.size()<1){
            return new ResponseEntity<>("Technology List Empty", HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(list, HttpStatus.OK);
    }
    
    public ResponseEntity singleGet(Long id){
        TechnologyDTO obj= techMapper.toDto(techService.getOne(id));
        if(obj == null){
            return new ResponseEntity<>("Technology Not Found", HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(obj, HttpStatus.OK);
    }
    
}
