package com.gottig.portfolio.dto.mapperimplementation;

import com.gottig.portfolio.dto.classes.EducationDTO;
import com.gottig.portfolio.dto.mapperintefaces.CommonMapper;
import com.gottig.portfolio.model.Education;
import java.util.ArrayList;
import java.util.List;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;


@Component
public class EducationMapperImplementation<T,S> implements CommonMapper<EducationDTO, Education>{
    
    @Autowired
    private ModelMapper modelMapper;
    
    EducationDTO educationDTO = new EducationDTO();
    
    Education education = new Education();
        

    @Override
    public EducationDTO toDto(Education education) {
        if ( education == null ) {
            return null;
        }
        
        modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.LOOSE);

        educationDTO= modelMapper.map(education, EducationDTO.class);
        
        return educationDTO;
    }

    @Override
    public List<EducationDTO> toDtoAll(List<Education> educationList) {
        if ( educationList == null ) {
            return null;
        }

        List<EducationDTO> list = new ArrayList<>( educationList.size() );
        for ( Education educ : educationList ) {
            list.add( toDto( educ ) );
        }

        return list;
    }

    @Override
    public Education toEntity(EducationDTO educationDTO) {
        if ( educationDTO == null ) {
            return null;
        }
        
        modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.LOOSE);

        education= modelMapper.map(educationDTO, Education.class);

        return education;
    }
    
}
