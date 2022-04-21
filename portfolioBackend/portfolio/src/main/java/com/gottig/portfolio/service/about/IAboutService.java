package com.gottig.portfolio.service.about;

import com.gottig.portfolio.model.About;
import java.util.List;



public interface IAboutService {
    
    public List<About> getAllAbout();
    public About getOneAbout(Long id);
    public void createAbout(About about);
    public void deleteAbout(Long id);
    
}
