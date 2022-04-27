package com.gottig.portfolio.service.interfaces;

import com.gottig.portfolio.model.MyUser;
import java.util.List;


/**
 *
 * @author gottig
 */
public interface IUserService {
    
    /**
     *
     * @return
     */
    public List<MyUser> getAllUsers();

    /**
     *
     * @param id
     * @return
     */
    public MyUser getOneUser(Long id);

    /**
     *
     * @param user
     */
    public void createUser(MyUser user);

    /**
     *
     * @param id
     */
    public void deleteUser(Long id);
    
}
