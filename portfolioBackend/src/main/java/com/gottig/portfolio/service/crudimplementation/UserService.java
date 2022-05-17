package com.gottig.portfolio.service.crudimplementation;

import com.gottig.portfolio.dao.UserDAO;
import com.gottig.portfolio.model.MyUser;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.gottig.portfolio.service.crudinterface.CRUDServiceInterface;




@Service
public class UserService<T> implements CRUDServiceInterface<MyUser>{
    
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
    public boolean create(MyUser user) {
        userDao.save(user);
        return true;
    }

    @Override
    public boolean update(MyUser obj) {
        if(!userDao.existsById(obj.getUserId())){
            return false;
        }else{
            userDao.save(obj);
            return true;
        }
    }

    @Override
    public boolean delete(Long id) {
        if(!userDao.existsById(id)){
            return false;
        }else{
            userDao.deleteById(id);
            return true;
        }
    }
    
}
