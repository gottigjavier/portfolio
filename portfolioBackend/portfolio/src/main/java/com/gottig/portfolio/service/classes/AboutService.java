package com.gottig.portfolio.service.classes;

import com.gottig.portfolio.dao.AboutDAO;
import com.gottig.portfolio.model.About;
import com.gottig.portfolio.service.interfaces.IAboutService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


/**
 *
 * @author gottig
 */
@Service
public class AboutService implements IAboutService{
    
    @Autowired
    AboutDAO aboutDao;

    /**
     *
     * @return
     */
    @Override
    public List<About> getAllAbout() {
        return aboutDao.findAll();
    }

    /**
     *
     * @param id
     * @return
     */
    @Override
    public About getOneAbout(Long id) {
        return aboutDao.getById(id);
    }

    /**
     *
     * @param about
     */
    @Override
    public void createAbout(About about) {
        aboutDao.save(about);
    }

    /**
     *
     * @param id
     */
    @Override
    public void deleteAbout(Long id) {
        aboutDao.deleteById(id);
    }
    
}
