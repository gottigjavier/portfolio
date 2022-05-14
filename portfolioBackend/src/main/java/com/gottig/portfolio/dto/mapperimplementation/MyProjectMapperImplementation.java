package com.gottig.portfolio.dto.mapperimplementation;

import com.gottig.portfolio.dto.classes.MyProjectDTO;
import com.gottig.portfolio.dto.mapperintefaces.MyProjectMapper;
import com.gottig.portfolio.model.MyProject;
import java.util.ArrayList;
import java.util.List;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class MyProjectMapperImplementation implements MyProjectMapper {
    
    @Autowired
    private ModelMapper modelMapper;

    @Override
    public MyProjectDTO toDto(MyProject myProject) {
        if ( myProject == null ) {
            return null;
        }
        
        modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.LOOSE);

        MyProjectDTO myProjectDTO = new MyProjectDTO();
        
        myProjectDTO= modelMapper.map(myProject, MyProjectDTO.class);
        
        return myProjectDTO;
    }

    @Override
    public List<MyProjectDTO> toDtoAll(List<MyProject> myProjects) {
        if ( myProjects == null ) {
            return null;
        }

        List<MyProjectDTO> list = new ArrayList<>( myProjects.size() );
        for ( MyProject myProject : myProjects ) {
            list.add( toDto( myProject ) );
        }

        return list;
    }

    @Override
    public MyProject toEntity(MyProjectDTO projDTO) {
        if ( projDTO == null ) {
            return null;
        }
        
        modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.LOOSE);

        MyProject myProject = new MyProject();
        
        myProject= modelMapper.map(projDTO, MyProject.class);
        
        return myProject;
    }
}
