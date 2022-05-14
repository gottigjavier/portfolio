package com.gottig.portfolio.dto.mapperimplementation;

import com.gottig.portfolio.dto.classes.AboutDTO;
import com.gottig.portfolio.dto.mapperintefaces.AboutMapper;
import com.gottig.portfolio.model.About;
import java.util.ArrayList;
import java.util.List;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;



@Component
public class AboutMapperImplementation implements AboutMapper{
    
    @Autowired
    private ModelMapper modelMapper;

    @Override
    public AboutDTO toDto(About about) {
        if ( about == null ) {
            return null;
        }
        
        modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.LOOSE);

        AboutDTO aboutDTO = new AboutDTO();
        
        aboutDTO= modelMapper.map(about, AboutDTO.class);
        
        return aboutDTO;
    }

    @Override
    public List<AboutDTO> toDtoAll(List<About> aboutList) {
        if ( aboutList == null ) {
            return null;
        }

        List<AboutDTO> list = new ArrayList<>( aboutList.size() );
        for ( About about : aboutList ) {
            list.add( toDto( about ) );
        }

        return list;
    }

    @Override
    public About toEntity(AboutDTO aboutDTO) {
        if ( aboutDTO == null ) {
            return null;
        }
        
        modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.LOOSE);

        About about = new About();
        
        about= modelMapper.map(aboutDTO, About.class);

        return about;
    }
    
}
