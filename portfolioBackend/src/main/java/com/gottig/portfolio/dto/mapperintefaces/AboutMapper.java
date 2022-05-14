package com.gottig.portfolio.dto.mapperintefaces;

import com.gottig.portfolio.dto.classes.AboutDTO;
import com.gottig.portfolio.model.About;
import java.util.List;



public interface AboutMapper {
    
    AboutDTO toDto(About about);
    
    List<AboutDTO> toDtoAll(List<About> aboutList);
    
    About toEntity(AboutDTO aboutDTO);
    
}
