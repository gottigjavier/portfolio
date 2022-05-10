package com.gottig.portfolio.service.classes;

import com.gottig.portfolio.dao.UserDAO;
import com.gottig.portfolio.model.MyUser;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.gottig.portfolio.service.crudinterface.CRUDServiceInterface;




@Service
public class UserService implements CRUDServiceInterface<MyUser>{
    
    @Autowired
    public UserDAO userDao;

    @Override
    public List<MyUser> getAll() {
        return userDao.findAll();
    }

    @Override
    public MyUser getOne(Long id) {
        return userDao.findById(id).orElse(null);
    }

    @Override
    public void create(MyUser user) {
        userDao.save(user);
    }

    @Override
    public void delete(Long id) {
        userDao.deleteById(id);
    }

    @Override
    public void update(MyUser obj) {
        throw new UnsupportedOperationException("Not supported yet."); // Generated from nbfs://nbhost/SystemFileSystem/Templates/Classes/Code/GeneratedMethodBody
    }
    
}
