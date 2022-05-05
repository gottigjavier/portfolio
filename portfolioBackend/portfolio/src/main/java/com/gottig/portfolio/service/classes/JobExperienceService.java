package com.gottig.portfolio.service.classes;

import com.gottig.portfolio.dao.JobExperienceDAO;
import com.gottig.portfolio.model.JobExperience;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.gottig.portfolio.service.crudinterface.CRUDServiceInterface;

@Service
public class JobExperienceService implements CRUDServiceInterface<JobExperience>{
    
    @Autowired
    public JobExperienceDAO objDao;

    @Override
    public List<JobExperience> getAll() {
        return objDao.findAll();
    }

    @Override
    public JobExperience getOne(Long id) {
        return objDao.findById(id).orElse(null);
    }

    @Override
    public void delete(Long id) {
        objDao.deleteById(id);
    }

    @Override
    public void create(JobExperience obj) {
        objDao.save(obj);// cast object
    }

    @Override
    public void update(JobExperience obj) {
        throw new UnsupportedOperationException("Not supported yet."); // Generated from nbfs://nbhost/SystemFileSystem/Templates/Classes/Code/GeneratedMethodBody
    }
    
}
