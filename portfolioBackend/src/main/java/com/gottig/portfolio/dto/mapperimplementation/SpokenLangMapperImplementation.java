package com.gottig.portfolio.dto.mapperimplementation;

import com.gottig.portfolio.dto.dtomodel.SpokenLangDTO;
import com.gottig.portfolio.dto.mapperinteface.CommonMapper;
import com.gottig.portfolio.model.SpokenLang;
import java.util.ArrayList;
import java.util.List;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;


@Component
public class SpokenLangMapperImplementation<T,S> implements CommonMapper<SpokenLangDTO,SpokenLang>{
    
    @Autowired
    private ModelMapper modelMapper;
    
    SpokenLangDTO langDTO = new SpokenLangDTO();
    SpokenLang lang = new SpokenLang();

    @Override
    public SpokenLangDTO toDto(SpokenLang lang) {
        if ( lang == null ) {
            return null;
        }
        
        modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.LOOSE);

        langDTO= modelMapper.map(lang, SpokenLangDTO.class);
        
        return langDTO;
    }

    @Override
    public List<SpokenLangDTO> toDtoAll(List<SpokenLang> langList) {
        if ( langList == null ) {
            return null;
        }

        List<SpokenLangDTO> list = new ArrayList<>( langList.size() );
        for ( SpokenLang langElement : langList ) {
            list.add( toDto( langElement ) );
        }

        return list;
    }

    @Override
    public SpokenLang toEntity(SpokenLangDTO langDTO) {
        if ( langDTO == null ) {
            return null;
        }
        
        modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.LOOSE);

        lang= modelMapper.map(langDTO, SpokenLang.class);

        return lang;
    }
    
}
