package com.gottig.portfolio.service.classes;

import com.gottig.portfolio.dao.MyProjectDAO;
import com.gottig.portfolio.model.MyProject;
import com.gottig.portfolio.service.crudinterface.CRUDServiceInterface;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class MyProjectService implements CRUDServiceInterface<MyProject>{
    
    @Autowired
    MyProjectDAO myProjectDao;

    @Override
    public List<MyProject> getAll() {
        return myProjectDao.findAll();
    }

    @Override
    public MyProject getOne(Long id) {
        return myProjectDao.findById(id).orElse(null);
    }

    @Override
    public void create(MyProject obj) {
        throw new UnsupportedOperationException("Not supported yet."); // Generated from nbfs://nbhost/SystemFileSystem/Templates/Classes/Code/GeneratedMethodBody
    }

    @Override
    public void delete(Long id) {
        throw new UnsupportedOperationException("Not supported yet."); // Generated from nbfs://nbhost/SystemFileSystem/Templates/Classes/Code/GeneratedMethodBody
    }

    @Override
    public String update(MyProject obj) {
        throw new UnsupportedOperationException("Not supported yet."); // Generated from nbfs://nbhost/SystemFileSystem/Templates/Classes/Code/GeneratedMethodBody
    }
    
}
