package com.gottig.portfolio.dto.mapperintefaces;

import com.gottig.portfolio.dto.classes.MyUserDTO;
import com.gottig.portfolio.model.MyUser;
import java.util.List;




public interface MyUserMapper {
    
    MyUserDTO toDto(MyUser myUser);
    
    List<MyUserDTO> toDtoAll(List<MyUser> userList); //Por ahora hay un solo usuario
    
    MyUser toEntity(MyUserDTO myUserDTO);
    
}
