package com.gottig.portfolio.dto.mapperintefaces;

import com.gottig.portfolio.dto.classes.MyProjectDTO;
import com.gottig.portfolio.model.MyProject;
import java.util.List;
//import org.mapstruct.Mapper;

//@Mapper(componentModel = "spring")
public interface MyProjectMapper {
    
    MyProjectDTO toDto (MyProject myProject);
    
    List<MyProjectDTO> toDtoAll(List<MyProject> myProjects);
    
    MyProject toEntity(MyProjectDTO proj);
    
}
