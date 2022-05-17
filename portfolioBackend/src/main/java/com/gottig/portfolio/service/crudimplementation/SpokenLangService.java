package com.gottig.portfolio.service.crudimplementation;

import com.gottig.portfolio.model.SpokenLang;
import com.gottig.portfolio.service.crudinterface.CRUDServiceInterface;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.gottig.portfolio.dao.SpokenLangDAO;



@Service
public class SpokenLangService<T> implements CRUDServiceInterface<SpokenLang>{
    
    @Autowired
    SpokenLangDAO langDao; 

    @Override
    public List<SpokenLang> getAll() {
        return langDao.findAll();
    }

    @Override
    public SpokenLang getOne(Long id) {
        return langDao.findById(id).orElse(null);
    }

    @Override
    public boolean create(SpokenLang obj) {
        langDao.save(obj);
        return true;
    }

    @Override
    public boolean update(SpokenLang obj) {
        if(!langDao.existsById(obj.getLanguageId())){
            return false;
        }else{
            langDao.save(obj);
            return true;
        }
    }
    
    @Override
    public boolean delete(Long id) {
        if(!langDao.existsById(id)){
            return false;
        }else{
            langDao.deleteById(id);
            return true;
        }
    }
    
}
