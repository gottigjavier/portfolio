package com.gottig.portfolio.dto.mapperimplementation;

import com.gottig.portfolio.dto.dtomodel.SkillDTO;
import com.gottig.portfolio.dto.mapperinteface.CommonMapper;
import com.gottig.portfolio.model.Skill;
import java.util.ArrayList;
import java.util.List;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;


@Component
public class SkillMapperImplementation<T,S> implements CommonMapper<SkillDTO,Skill>{
    
    @Autowired
    private ModelMapper modelMapper;
    
    SkillDTO skillDTO = new SkillDTO();
    Skill skill = new Skill();

    @Override
    public SkillDTO toDto(Skill skill) {
        if ( skill == null ) {
            return null;
        }
        
        modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.LOOSE);
        
        skillDTO= modelMapper.map(skill, SkillDTO.class);
        
        return skillDTO;
    }

    @Override
    public List<SkillDTO> toDtoAll(List<Skill> skillList) {
        if ( skillList == null ) {
            return null;
        }

        List<SkillDTO> list = new ArrayList<>( skillList.size() );
        for ( Skill skillElement : skillList ) {
            list.add( toDto( skillElement ) );
        }

        return list;
    }

    @Override
    public Skill toEntity(SkillDTO skillDTO) {
        if ( skillDTO == null ) {
            return null;
        }
        
        modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.LOOSE);
        
        skill= modelMapper.map(skillDTO, Skill.class);

        return skill;
    }
    
}
