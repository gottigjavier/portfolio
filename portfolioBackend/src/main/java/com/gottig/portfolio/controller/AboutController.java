package com.gottig.portfolio.controller;

import com.gottig.portfolio.dto.dtomodel.AboutDTO;
import com.gottig.portfolio.dto.mapperinteface.CommonMapper;
import com.gottig.portfolio.model.About;
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
@RequestMapping("about")
public class AboutController {
    
    @Autowired
    private CRUDServiceInterface<About> aboutService;
    
    @Autowired
    private CommonMapper<AboutDTO, About> aboutMapper;
    
    @Operation(summary = "List of all About")
    @ApiResponses(value = { 
        @ApiResponse(responseCode = "200", description = "List of About", 
        content = { @Content(mediaType = "application/json", 
        schema = @Schema(implementation = AboutDTO.class)) }),
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
    
    
    @Operation(summary = "Get a About by its id")
    @ApiResponses(value = { 
        @ApiResponse(responseCode = "200", description = "Get About", 
        content = { @Content(mediaType = "application/json", 
        schema = @Schema(implementation = AboutDTO.class)) }),
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
    
    
    @Operation(summary = "Create About")
    @ApiResponses(value = { 
        @ApiResponse(responseCode = "200", description = "Create About", 
        content = { @Content(mediaType = "application/json", 
        schema = @Schema(implementation = AboutDTO.class)) }),
    @ApiResponse(responseCode = "401", description = "Not Authorized", 
        content = @Content),
    @ApiResponse(responseCode = "400", description = "Bad request", 
        content = @Content),
    @ApiResponse(responseCode = "500", description = "Database error", 
        content = @Content) })
    @PostMapping
    @CrossOrigin(origins = "${cross.origin.value}")
    @ResponseBody
    public ResponseEntity create(@RequestBody AboutDTO aboutDTO){
        if(!aboutService.create(aboutMapper.toEntity(aboutDTO))){
            return new ResponseEntity<>("About Not Created", HttpStatus.BAD_REQUEST);
        }
        return getList();
    }
    
    
    @Operation(summary = "Update About")
    @ApiResponses(value = { 
        @ApiResponse(responseCode = "200", description = "Update About", 
        content = { @Content(mediaType = "application/json", 
        schema = @Schema(implementation = AboutDTO.class)) }),
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
    public ResponseEntity update(@RequestBody AboutDTO aboutDTO){
        if(!aboutService.update(aboutMapper.toEntity(aboutDTO))){
            return new ResponseEntity<>("About Not Updated", HttpStatus.NOT_MODIFIED);
        }
        return singleGet(aboutDTO.getAboutId());
    }
    
    
    @Operation(summary = "Update List of About")
    @ApiResponses(value = { 
        @ApiResponse(responseCode = "200", description = "Update List of About", 
        content = { @Content(mediaType = "application/json", 
        schema = @Schema(implementation = AboutDTO.class)) }),
    @ApiResponse(responseCode = "401", description = "Not Authorized", 
        content = @Content),
    @ApiResponse(responseCode = "400", description = "Bad request", 
        content = @Content),
    @ApiResponse(responseCode = "500", description = "Database error", 
        content = @Content) })
    @PutMapping("/list")
    @CrossOrigin(origins = "${cross.origin.value}")
    @ResponseBody
    public ResponseEntity updateList(@RequestBody List<AboutDTO> aboutListDTO){
        for(AboutDTO aboutDTO : aboutListDTO){
         if(!aboutService.update(aboutMapper.toEntity(aboutDTO))){
             return new ResponseEntity<>("About id: (" + aboutDTO.getAboutId() +  ") Not Updated", HttpStatus.NOT_MODIFIED);
         }   
        }
        return getList();
    }
    
    
    @Operation(summary = "Delete About")
    @ApiResponses(value = { 
        @ApiResponse(responseCode = "200", description = "Delete About", 
        content = { @Content(mediaType = "application/json", 
        schema = @Schema(implementation = AboutDTO.class)) }),
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
        if(!aboutService.delete(id)){
            return new ResponseEntity<>("About Not Deleted", HttpStatus.CONFLICT);
        }
        return getList();
    }
    
    
    public ResponseEntity getList(){
        List<AboutDTO> list = aboutMapper.toDtoAll(aboutService.getAll());
        if(list.size()<1){
            return new ResponseEntity<>("About List Empty", HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(list, HttpStatus.OK);
    }
    
    public ResponseEntity singleGet(Long id){
        AboutDTO obj= aboutMapper.toDto(aboutService.getOne(id));
        if(obj == null){
            return new ResponseEntity<>("About Not Found", HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(obj, HttpStatus.OK);
    }
    
}