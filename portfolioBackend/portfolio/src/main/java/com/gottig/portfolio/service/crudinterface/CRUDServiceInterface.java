package com.gottig.portfolio.service.crudinterface;

import java.util.List;


public interface CRUDServiceInterface<T> {
    
    public List<T> getAll();

    public T getOne(Long id);

    public void create(T obj);

    public void delete(Long id);
    
    public void change(Long id);
    
}
