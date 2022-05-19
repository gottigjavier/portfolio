package com.gottig.portfolio.dto.mapperimplementation;

import com.gottig.portfolio.dto.dtomodel.AboutDTO;
import com.gottig.portfolio.dto.mapperinteface.CommonMapper;
import com.gottig.portfolio.model.About;
import java.util.ArrayList;
import java.util.List;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;



@Component
public class AboutMapperImplementation<T,S> implements CommonMapper<AboutDTO,About>{
    
    @Autowired
    private ModelMapper modelMapper;
    
    AboutDTO aboutDTO = new AboutDTO();
    About about = new About();

    @Override
    public AboutDTO toDto(About about) {
        if ( about == null ) {
            return null;
        }
        
        modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.LOOSE);

        aboutDTO= modelMapper.map(about, AboutDTO.class);
        
        return aboutDTO;
    }

    @Override
    public List<AboutDTO> toDtoAll(List<About> aboutList) {
        if ( aboutList == null ) {
            return null;
        }

        List<AboutDTO> list = new ArrayList<>( aboutList.size() );
        for ( About aboutElement : aboutList ) {
            list.add( toDto( aboutElement ) );
        }

        return list;
    }

    @Override
    public About toEntity(AboutDTO aboutDTO) {
        if ( aboutDTO == null ) {
            return null;
        }
        
        modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.LOOSE);

        about= modelMapper.map(aboutDTO, About.class);

        return about;
    }
    
}
