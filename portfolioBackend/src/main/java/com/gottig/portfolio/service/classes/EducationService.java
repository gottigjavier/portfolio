package com.gottig.portfolio.service.classes;

import com.gottig.portfolio.dao.EducationDAO;
import com.gottig.portfolio.model.Education;
import com.gottig.portfolio.service.crudinterface.CRUDServiceInterface;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class EducationService implements CRUDServiceInterface<Education>{
    
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
    public void create(Education obj) {
        educationDao.save(obj);
    }

    @Override
    public void delete(Long id) {
        educationDao.deleteById(id);
    }

    @Override
    public String update(Education obj) {
        throw new UnsupportedOperationException("Not supported yet."); // Generated from nbfs://nbhost/SystemFileSystem/Templates/Classes/Code/GeneratedMethodBody
    }
    
}
