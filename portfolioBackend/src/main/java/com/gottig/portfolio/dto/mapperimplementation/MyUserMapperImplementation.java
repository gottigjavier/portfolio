package com.gottig.portfolio.dto.mapperimplementation;

import com.gottig.portfolio.dto.classes.MyUserDTO;
import com.gottig.portfolio.dto.mapperintefaces.CommonMapper;
import com.gottig.portfolio.model.MyUser;
import java.util.ArrayList;
import java.util.List;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;



@Component
public class MyUserMapperImplementation<T,S> implements CommonMapper<MyUserDTO, MyUser>{
    
    @Autowired
    private ModelMapper modelMapper;
    
    MyUserDTO myUserDTO = new MyUserDTO();
    
    MyUser myUser = new MyUser();
        

    @Override
    public MyUserDTO toDto(MyUser myUser) {
        if ( myUser == null ) {
            return null;
        }
        
        modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.LOOSE);

        myUserDTO= modelMapper.map(myUser, MyUserDTO.class);
        
        return myUserDTO;
    }

    @Override
    public List<MyUserDTO> toDtoAll(List<MyUser> myUserList) {
        if ( myUserList == null ) {
            return null;
        }

        List<MyUserDTO> list = new ArrayList<>( myUserList.size() );
        for ( MyUser user : myUserList ) {
            list.add( toDto( user ) );
        }

        return list;
    }

    @Override
    public MyUser toEntity(MyUserDTO myUserDTO) {
        if ( myUserDTO == null ) {
            return null;
        }
        
        modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.LOOSE);

        myUser= modelMapper.map(myUserDTO, MyUser.class);

        return myUser;
    }
    
}
