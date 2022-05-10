package com.gottig.portfolio.service.classes;

import com.gottig.portfolio.dao.AboutDAO;
import com.gottig.portfolio.model.About;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.gottig.portfolio.service.crudinterface.CRUDServiceInterface;


@Service
public class AboutService implements CRUDServiceInterface<About>{
    
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
    public void create(About about) {
        aboutDao.save(about);
    }

    @Override
    public void delete(Long id) {
        aboutDao.deleteById(id);
    }

    @Override
    public void update(About obj) {
        throw new UnsupportedOperationException("Not supported yet."); // Generated from nbfs://nbhost/SystemFileSystem/Templates/Classes/Code/GeneratedMethodBody
    }
    
}