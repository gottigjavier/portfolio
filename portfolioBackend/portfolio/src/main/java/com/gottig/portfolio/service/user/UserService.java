package com.gottig.portfolio.service.user;

import com.gottig.portfolio.dao.UserDAO;
import com.gottig.portfolio.model.MyUser;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService implements IUserService{
    
    /**
     *
     */
    @Autowired
    public UserDAO userDao;

    @Override
    public List<MyUser> getAllUsers() {
        return userDao.findAll();
    }

    @Override
    public MyUser getOneUser(Long id) {
        return userDao.getById(id);
    }

    @Override
    public void createUser(MyUser user) {
        userDao.save(user);
    }

    @Override
    public void deleteUser(Long id) {
        userDao.deleteById(id);
    }
    
}
