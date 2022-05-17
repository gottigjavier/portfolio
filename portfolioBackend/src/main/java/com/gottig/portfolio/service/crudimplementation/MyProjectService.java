package com.gottig.portfolio.service.crudimplementation;

import com.gottig.portfolio.dao.MyProjectDAO;
import com.gottig.portfolio.model.MyProject;
import com.gottig.portfolio.service.crudinterface.CRUDServiceInterface;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class MyProjectService<T> implements CRUDServiceInterface<MyProject>{
    
    @Autowired
    MyProjectDAO projDao;

    @Override
    public List<MyProject> getAll() {
        return projDao.findAll();
    }

    @Override
    public MyProject getOne(Long id) {
        return projDao.findById(id).orElse(null);
    }

    @Override
    public boolean create(MyProject obj) {
        projDao.save(obj);
        return true;
    }

    @Override
    public boolean update(MyProject obj) {
        if(!projDao.existsById(obj.getProjId())){
            return false;
        }else{
            projDao.save(obj);
            return true;
        }
    }
    
    @Override
    public boolean delete(Long id) {
        if(!projDao.existsById(id)){
            return false;
        }else{
            projDao.deleteById(id);
            return true;
        }
    }
    
}
