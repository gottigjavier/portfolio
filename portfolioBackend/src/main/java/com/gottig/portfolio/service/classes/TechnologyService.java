package com.gottig.portfolio.service.classes;

import com.gottig.portfolio.dao.TechnologyDAO;
import com.gottig.portfolio.model.Technology;
import com.gottig.portfolio.service.crudinterface.CRUDServiceInterface;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class TechnologyService implements CRUDServiceInterface<Technology>{
    
    @Autowired
    TechnologyDAO technologyDao;

    @Override
    public List<Technology> getAll() {
        return technologyDao.findAll();
    }

    @Override
    public Technology getOne(Long id) {
        throw new UnsupportedOperationException("Not supported yet."); // Generated from nbfs://nbhost/SystemFileSystem/Templates/Classes/Code/GeneratedMethodBody
    }

    @Override
    public void create(Technology obj) {
        technologyDao.save(obj);
    }

    @Override
    public void delete(Long id) {
        throw new UnsupportedOperationException("Not supported yet."); // Generated from nbfs://nbhost/SystemFileSystem/Templates/Classes/Code/GeneratedMethodBody
    }

    @Override
    public String update(Technology obj) {
        Technology techObj = technologyDao.findById(obj.getTechId()).orElse(null);
        if(techObj != null){
            technologyDao.save(obj);
            return "Technology Updated";
        }else{
          return "Technology Not Found";
        }
    }
    
}
