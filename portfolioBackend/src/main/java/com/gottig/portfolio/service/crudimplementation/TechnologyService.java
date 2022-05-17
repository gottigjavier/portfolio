package com.gottig.portfolio.service.crudimplementation;

import com.gottig.portfolio.dao.TechnologyDAO;
import com.gottig.portfolio.model.Technology;
import com.gottig.portfolio.service.crudinterface.CRUDServiceInterface;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class TechnologyService<T> implements CRUDServiceInterface<Technology>{
    
    @Autowired
    TechnologyDAO technologyDao;

    @Override
    public List<Technology> getAll() {
        return technologyDao.findAll();
    }

    @Override
    public Technology getOne(Long id) {
        return technologyDao.findById(id).orElse(null);
    }

    @Override
    public boolean create(Technology obj) {
        technologyDao.save(obj);
        return true;
    }

    @Override
    public boolean delete(Long id) {
        if(!technologyDao.existsById(id)){    
            return false;
        }else{
            technologyDao.deleteById(id);
            return true;
        }
    }

    @Override
    public boolean update(Technology obj) {
        if(!technologyDao.existsById(obj.getTechId())){
            return false;
        }else{
            technologyDao.save(obj);
            return true;
        }
    }
    
}
