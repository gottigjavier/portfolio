package com.gottig.portfolio.service.classes;

import com.gottig.portfolio.dao.UserDAO;
import com.gottig.portfolio.model.MyUser;
import com.gottig.portfolio.service.interfaces.IUserService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;




/**
 *
 * @author gottig
 */
@Service
public class UserService implements IUserService{
    
    /**
     *
     */
    @Autowired
    public UserDAO userDao;

    /**
     *
     * @return
     */
    @Override
    public List<MyUser> getAllUsers() {
        return userDao.findAll();
    }

    /**
     *
     * @param id
     * @return
     */
    @Override
    public MyUser getOneUser(Long id) {
        return userDao.getById(id);
    }

    /**
     *
     * @param user
     */
    @Override
    public void createUser(MyUser user) {
        userDao.save(user);
    }

    /**
     *
     * @param id
     */
    @Override
    public void deleteUser(Long id) {
        userDao.deleteById(id);
    }
    
}
