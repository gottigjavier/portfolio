package com.gottig.portfolio.service.interfaces;

import com.gottig.portfolio.model.About;
import java.util.List;


/**
 *
 * @author gottig
 */
public interface IAboutService {
    
    /**
     *
     * @return
     */
    public List<About> getAllAbout();

    /**
     *
     * @param id
     * @return
     */
    public About getOneAbout(Long id);

    /**
     *
     * @param about
     */
    public void createAbout(About about);

    /**
     *
     * @param id
     */
    public void deleteAbout(Long id);
    
}
