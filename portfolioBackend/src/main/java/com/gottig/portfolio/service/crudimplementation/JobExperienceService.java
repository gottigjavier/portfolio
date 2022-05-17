package com.gottig.portfolio.service.crudimplementation;

import com.gottig.portfolio.dao.JobExperienceDAO;
import com.gottig.portfolio.model.JobExperience;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.gottig.portfolio.service.crudinterface.CRUDServiceInterface;

@Service
public class JobExperienceService<T> implements CRUDServiceInterface<JobExperience>{
    
    @Autowired
    public JobExperienceDAO jobDao;

    @Override
    public List<JobExperience> getAll() {
        return jobDao.findAll();
    }

    @Override
    public JobExperience getOne(Long id) {
        return jobDao.findById(id).orElse(null);
    }

    @Override
    public boolean create(JobExperience obj) {
        jobDao.save(obj);
        return true;
    }

    @Override
    public boolean update(JobExperience obj) {
        if(!jobDao.existsById(obj.getJobId())){
            return false;
        }else{
            jobDao.save(obj);
            return true;
        }
    }
    
    @Override
    public boolean delete(Long id) {
        if(!jobDao.existsById(id)){
            return false;
        }
        jobDao.deleteById(id);
        return true;
    }
    
}
