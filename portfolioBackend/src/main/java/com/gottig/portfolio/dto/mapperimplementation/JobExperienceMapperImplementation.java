package com.gottig.portfolio.dto.mapperimplementation;

import com.gottig.portfolio.dto.dtomodel.JobExperienceDTO;
import com.gottig.portfolio.dto.mapperinteface.CommonMapper;
import com.gottig.portfolio.model.JobExperience;
import java.util.ArrayList;
import java.util.List;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;


@Component
public class JobExperienceMapperImplementation<T,S> implements CommonMapper<JobExperienceDTO,JobExperience>{
    
    @Autowired
    private ModelMapper modelMapper;
    
    JobExperienceDTO jobExperienceDTO = new JobExperienceDTO();
    
    JobExperience jobExperience = new JobExperience();

    @Override
    public JobExperienceDTO toDto(JobExperience jobExperience) {
        if ( jobExperience == null ) {
            return null;
        }
        
        modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.LOOSE);

        //AboutDTO aboutDTO = new AboutDTO();
        
        jobExperienceDTO= modelMapper.map(jobExperience, JobExperienceDTO.class);
        
        return jobExperienceDTO;
    }

    @Override
    public List<JobExperienceDTO> toDtoAll(List<JobExperience> jobList) {
        if ( jobList == null ) {
            return null;
        }

        List<JobExperienceDTO> list = new ArrayList<>( jobList.size() );
        for ( JobExperience jobElement : jobList ) {
            list.add( toDto( jobElement ) );
        }

        return list;
    }

    @Override
    public JobExperience toEntity(JobExperienceDTO jobExperienceDTO) {
        if ( jobExperienceDTO == null ) {
            return null;
        }
        
        modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.LOOSE);

        //About about = new About();
        
        jobExperience= modelMapper.map(jobExperienceDTO, JobExperience.class);

        return jobExperience;
    }
}
