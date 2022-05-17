package com.gottig.portfolio.service.crudinterface;

import java.util.List;


public interface CRUDServiceInterface<T> {
    
    public List<T> getAll();

    public T getOne(Long id);

    public boolean create(T obj);
    
    public boolean update(T obj);
    
    public boolean delete(Long id);

}
