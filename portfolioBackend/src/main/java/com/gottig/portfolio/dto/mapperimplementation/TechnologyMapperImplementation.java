package com.gottig.portfolio.dto.mapperimplementation;

import com.gottig.portfolio.dto.classes.TechnologyDTO;
import com.gottig.portfolio.dto.mapperintefaces.TechnologyMapper;
import com.gottig.portfolio.model.Technology;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2022-05-14T16:20:19-0300",
    comments = "version: 1.4.2.Final, compiler: javac, environment: Java 11.0.14 (Flathub)"
)
@Primary
@Component
public class TechnologyMapperImplementation implements TechnologyMapper {
    
    @Autowired
    private ModelMapper modelMapper;

    @Override
    public TechnologyDTO toDto(Technology technology) {
        if ( technology == null ) {
            return null;
        }
        
        modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.LOOSE);

        TechnologyDTO technologyDTO = new TechnologyDTO();
        
        technologyDTO= modelMapper.map(technology, TechnologyDTO.class);
        
        return technologyDTO;
    }

    @Override
    public List<TechnologyDTO> toDtoAll(List<Technology> technologyList) {
        if ( technologyList == null ) {
            return null;
        }

        List<TechnologyDTO> list = new ArrayList<>( technologyList.size() );
        for ( Technology technology : technologyList ) {
            list.add( toDto( technology ) );
        }

        return list;
    }

    @Override
    public Technology toEntity(TechnologyDTO techDTO) {
        if ( techDTO == null ) {
            return null;
        }
        
        modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.LOOSE);

        Technology technology = new Technology();
        
        technology= modelMapper.map(techDTO, Technology.class);

        return technology;
    }
}
