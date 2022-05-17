package com.gottig.portfolio.dto.mapperintefaces;

import java.util.List;



public interface CommonMapper<T,S> {
    
        T toDto(S obj);
    
    List<T> toDtoAll(List<S> list); //Por ahora hay un solo usuario
    
    S toEntity(T ojbDTO);
    
}
