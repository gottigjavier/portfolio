package com.gottig.portfolio.service.crudimplementation;

import com.gottig.portfolio.dao.EducationDAO;
import com.gottig.portfolio.model.Education;
import com.gottig.portfolio.service.crudinterface.CRUDServiceInterface;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class EducationService<T> implements CRUDServiceInterface<Education>{
    
    @Autowired
    EducationDAO educationDao;

    @Override
    public List<Education> getAll() {
        return educationDao.findAll();
    }

    @Override
    public Education getOne(Long id) {
        return educationDao.findById(id).orElse(null);
    }

    @Override
    public boolean create(Education obj) {
        educationDao.save(obj);
        return true;
    }

    @Override
    public boolean update(Education obj) {
        if(!educationDao.existsById(obj.getEducationId())){
            return false;
        }else{
            educationDao.save(obj);
            return true;
        }
    }
    
    @Override
    public boolean delete(Long id) {
        if(!educationDao.existsById(id)){
            return false;
        }
        educationDao.deleteById(id);
        return true;
    }
    
}
