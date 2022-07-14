package com.gottig.portfolio.controller;

import com.gottig.portfolio.dto.dtomodel.MyProjectDTO;
import com.gottig.portfolio.dto.mapperinteface.CommonMapper;
import com.gottig.portfolio.model.MyProject;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import com.gottig.portfolio.service.crudinterface.CRUDServiceInterface;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;



@RestController
@RequestMapping("my-project")
public class MyProjectController {
    
    @Autowired
    private CRUDServiceInterface<MyProject> projService;
    
    @Autowired
    private CommonMapper<MyProjectDTO, MyProject> projMapper;
    
    
    @Operation(summary = "List of all MyProject")
    @ApiResponses(value = { 
        @ApiResponse(responseCode = "200", description = "List of MyProject", 
        content = { @Content(mediaType = "application/json", 
        schema = @Schema(implementation = MyProjectDTO.class)) }),
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
    
    
    @Operation(summary = "Get a MyProject by its id")
    @ApiResponses(value = { 
        @ApiResponse(responseCode = "200", description = "Get MyProject", 
        content = { @Content(mediaType = "application/json", 
        schema = @Schema(implementation = MyProjectDTO.class)) }),
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
    
    
    @Operation(summary = "Create MyProject")
    @ApiResponses(value = { 
        @ApiResponse(responseCode = "200", description = "Create MyProject", 
        content = { @Content(mediaType = "application/json", 
        schema = @Schema(implementation = MyProjectDTO.class)) }),
    @ApiResponse(responseCode = "401", description = "Not Authorized", 
        content = @Content),
    @ApiResponse(responseCode = "400", description = "Bad request", 
        content = @Content),
    @ApiResponse(responseCode = "500", description = "Database error", 
        content = @Content) })
    @PostMapping
    @CrossOrigin(origins = "${cross.origin.value}")
    @ResponseBody
    public ResponseEntity create(@RequestBody MyProjectDTO projDTO){
        if(!projService.create(projMapper.toEntity(projDTO))){
            return new ResponseEntity<>("Project Not Created", HttpStatus.BAD_REQUEST);
        }
        return getList();
    }
    
    
    @Operation(summary = "Update MyProject")
    @ApiResponses(value = { 
        @ApiResponse(responseCode = "200", description = "Update MyProject", 
        content = { @Content(mediaType = "application/json", 
        schema = @Schema(implementation = MyProjectDTO.class)) }),
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
    public ResponseEntity update(@RequestBody MyProjectDTO projDTO){
        if(!projService.update(projMapper.toEntity(projDTO))){
            return new ResponseEntity<>("Project Not Updated", HttpStatus.NOT_MODIFIED);
        }
        return singleGet(projDTO.getProjId());
    }
    
    
    @Operation(summary = "Update List of MyProject")
    @ApiResponses(value = { 
        @ApiResponse(responseCode = "200", description = "Update List of MyProject", 
        content = { @Content(mediaType = "application/json", 
        schema = @Schema(implementation = MyProjectDTO.class)) }),
    @ApiResponse(responseCode = "401", description = "Not Authorized", 
        content = @Content),
    @ApiResponse(responseCode = "400", description = "Bad request", 
        content = @Content),
    @ApiResponse(responseCode = "500", description = "Database error", 
        content = @Content) })
    @PutMapping("/list")
    @CrossOrigin(origins = "${cross.origin.value}")
    @ResponseBody
    public ResponseEntity updateList(@RequestBody List<MyProjectDTO> projListDTO){
        for(MyProjectDTO projDTO : projListDTO){
            if(!projService.update(projMapper.toEntity(projDTO))){
                return new ResponseEntity<>("Project Not Updated", HttpStatus.NOT_MODIFIED);
            }   
        }
        return getList();
    }
    
    
    @Operation(summary = "Delete MyProject")
    @ApiResponses(value = { 
        @ApiResponse(responseCode = "200", description = "Delte MyProject", 
        content = { @Content(mediaType = "application/json", 
        schema = @Schema(implementation = MyProjectDTO.class)) }),
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
        if(!projService.delete(id)){
            return new ResponseEntity<>("Project Not Deleted", HttpStatus.CONFLICT);
        }
        return getList();
    }
    
    
    public ResponseEntity getList(){
        List<MyProjectDTO> list = projMapper.toDtoAll(projService.getAll());
        if(list.size()<1){
            return new ResponseEntity<>("Project List Empty", HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(list, HttpStatus.OK);
    }
    
    public ResponseEntity singleGet(Long id){
        MyProjectDTO obj= projMapper.toDto(projService.getOne(id));
        if(obj == null){
            return new ResponseEntity<>("Project Not Found", HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(obj, HttpStatus.OK);
    }
    
}
