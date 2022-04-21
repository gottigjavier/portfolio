package com.gottig.portfolio.service.user;

import com.gottig.portfolio.model.MyUser;
import java.util.List;


public interface IUserService {
    
    public List<MyUser> getAllUsers();
    public MyUser getOneUser(Long id);
    public void createUser(MyUser user);
    public void deleteUser(Long id);
    
}
