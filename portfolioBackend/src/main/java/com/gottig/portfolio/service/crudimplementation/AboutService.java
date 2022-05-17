package com.gottig.portfolio.service.crudimplementation;

import com.gottig.portfolio.dao.AboutDAO;
import com.gottig.portfolio.model.About;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.gottig.portfolio.service.crudinterface.CRUDServiceInterface;


@Service
public class AboutService<T> implements CRUDServiceInterface<About>{
    
    @Autowired
    AboutDAO aboutDao;

    @Override
    public List<About> getAll() {
        return aboutDao.findAll();
    }

    @Override
    public About getOne(Long id) {
        return aboutDao.findById(id).orElse(null);
    }

    @Override
    public boolean create(About obj) {
        aboutDao.save(obj);
        return true;
    }

    @Override
    public boolean update(About obj) {
        if(!aboutDao.existsById(obj.getAboutId())){
            return false;
        }else{
            aboutDao.save(obj);
            return true;
        }
    }
    
    @Override
    public boolean delete(Long id) {
        if(!aboutDao.existsById(id)){
            return false;
        }else{
            aboutDao.deleteById(id);
            return true;
        }
        
    }
    
}