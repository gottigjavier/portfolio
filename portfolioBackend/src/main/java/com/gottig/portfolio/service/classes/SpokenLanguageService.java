package com.gottig.portfolio.service.classes;

import com.gottig.portfolio.dao.SpokenLanguageDAO;
import com.gottig.portfolio.model.SpokenLanguage;
import com.gottig.portfolio.service.crudinterface.CRUDServiceInterface;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;



@Service
public class SpokenLanguageService implements CRUDServiceInterface<SpokenLanguage>{
    
    @Autowired
    SpokenLanguageDAO spokenLanguageDAO; 

    @Override
    public List<SpokenLanguage> getAll() {
        return spokenLanguageDAO.findAll();
    }

    @Override
    public SpokenLanguage getOne(Long id) {
        return spokenLanguageDAO.findById(id).orElse(null);
    }

    @Override
    public void create(SpokenLanguage obj) {
        spokenLanguageDAO.save(obj);
    }

    @Override
    public void delete(Long id) {
        spokenLanguageDAO.deleteById(id);
    }

    @Override
    public String update(SpokenLanguage obj) {
        throw new UnsupportedOperationException("Not supported yet."); // Generated from nbfs://nbhost/SystemFileSystem/Templates/Classes/Code/GeneratedMethodBody
    }
    
}
