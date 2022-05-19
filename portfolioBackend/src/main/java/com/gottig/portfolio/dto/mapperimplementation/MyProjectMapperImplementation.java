package com.gottig.portfolio.dto.mapperimplementation;

import com.gottig.portfolio.dto.dtomodel.MyProjectDTO;
import com.gottig.portfolio.dto.mapperinteface.CommonMapper;
import com.gottig.portfolio.model.MyProject;
import java.util.ArrayList;
import java.util.List;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class MyProjectMapperImplementation<T,S> implements CommonMapper<MyProjectDTO, MyProject> {
    
    @Autowired
    private ModelMapper modelMapper;
    
    MyProjectDTO myProjectDTO = new MyProjectDTO();
    
    MyProject myProject = new MyProject();
           

    @Override
    public MyProjectDTO toDto(MyProject myProject) {
        if ( myProject == null ) {
            return null;
        }
        
        modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.LOOSE);

        myProjectDTO= modelMapper.map(myProject, MyProjectDTO.class);
        
        return myProjectDTO;
    }

    @Override
    public List<MyProjectDTO> toDtoAll(List<MyProject> myProjects) {
        if ( myProjects == null ) {
            return null;
        }

        List<MyProjectDTO> list = new ArrayList<>( myProjects.size() );
        for ( MyProject myProj : myProjects ) {
            list.add( toDto( myProj ) );
        }

        return list;
    }

    @Override
    public MyProject toEntity(MyProjectDTO projDTO) {
        if ( projDTO == null ) {
            return null;
        }
        
        modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.LOOSE);
        
        myProject= modelMapper.map(projDTO, MyProject.class);
        
        return myProject;
    }
}
