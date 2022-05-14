package com.gottig.portfolio.dto.mapperintefaces;

import com.gottig.portfolio.dto.classes.TechnologyDTO;
import com.gottig.portfolio.model.Technology;
import java.util.List;
//import org.mapstruct.Mapper;


//@Mapper(componentModel = "spring")
public interface TechnologyMapper {
    
    TechnologyDTO toDto(Technology technology);
    
    List<TechnologyDTO> toDtoAll(List<Technology> technologyList);
    
    Technology toEntity(TechnologyDTO techDTO);
    
}
