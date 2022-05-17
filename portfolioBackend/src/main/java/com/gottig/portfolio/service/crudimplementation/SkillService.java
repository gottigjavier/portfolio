package com.gottig.portfolio.service.crudimplementation;

import com.gottig.portfolio.dao.SkillDAO;
import com.gottig.portfolio.model.Skill;
import com.gottig.portfolio.service.crudinterface.CRUDServiceInterface;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class SkillService<T> implements CRUDServiceInterface<Skill>{
    
    @Autowired
    SkillDAO skillDao;

    @Override
    public List<Skill> getAll() {
        return skillDao.findAll();
    }

    @Override
    public Skill getOne(Long id) {
        return skillDao.findById(id).orElse(null);
    }

    @Override
    public boolean create(Skill obj) {
        skillDao.save(obj);
        return true;
    }

    @Override
    public boolean update(Skill obj) {
        if(!skillDao.existsById(obj.getSkillId())){
            return false;
        }else{
            skillDao.save(obj);
            return true;
        }
    }

    @Override
    public boolean delete(Long id) {
        if(!skillDao.existsById(id)){
            return false;
        }else{
            skillDao.deleteById(id);
            return true;
        }
    }
    
}
