package com.gottig.portfolio.dto.mapperimplementation;

import com.gottig.portfolio.dto.dtomodel.TechnologyDTO;
import com.gottig.portfolio.dto.mapperinteface.CommonMapper;
import com.gottig.portfolio.model.Technology;
import java.util.ArrayList;
import java.util.List;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;



@Component
public class TechnologyMapperImplementation<T,S> implements CommonMapper<TechnologyDTO, Technology> {
    
    @Autowired
    private ModelMapper modelMapper;
    
    TechnologyDTO technologyDTO = new TechnologyDTO();
    
    Technology technology = new Technology();
        

    @Override
    public TechnologyDTO toDto(Technology technology) {
        if ( technology == null ) {
            return null;
        }
        
        modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.LOOSE);

        technologyDTO= modelMapper.map(technology, TechnologyDTO.class);
        
        return technologyDTO;
    }

    @Override
    public List<TechnologyDTO> toDtoAll(List<Technology> technologyList) {
        if ( technologyList == null ) {
            return null;
        }

        List<TechnologyDTO> list = new ArrayList<>( technologyList.size() );
        for ( Technology tech : technologyList ) {
            list.add( toDto( tech ) );
        }

        return list;
    }

    @Override
    public Technology toEntity(TechnologyDTO techDTO) {
        if ( techDTO == null ) {
            return null;
        }
        
        modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.LOOSE);

        technology= modelMapper.map(techDTO, Technology.class);

        return technology;
    }
}
