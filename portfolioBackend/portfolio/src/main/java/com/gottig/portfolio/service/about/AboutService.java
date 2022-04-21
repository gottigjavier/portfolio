package com.gottig.portfolio.service.about;

import com.gottig.portfolio.dao.AboutDAO;
import com.gottig.portfolio.model.About;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class AboutService implements IAboutService{
    
    @Autowired
    AboutDAO aboutDao;

    @Override
    public List<About> getAllAbout() {
        return aboutDao.findAll();
    }

    @Override
    public About getOneAbout(Long id) {
        throw new UnsupportedOperationException("Not supported yet."); // Generated from nbfs://nbhost/SystemFileSystem/Templates/Classes/Code/GeneratedMethodBody
    }

    @Override
    public void createAbout(About about) {
        aboutDao.save(about);
    }

    @Override
    public void deleteAbout(Long id) {
        aboutDao.deleteById(id);
    }
    
}
