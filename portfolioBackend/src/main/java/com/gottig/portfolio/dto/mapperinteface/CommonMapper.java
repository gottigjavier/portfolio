package com.gottig.portfolio.dto.mapperinteface;

import java.util.List;



public interface CommonMapper<T,S> {
    
    T toDto(S obj);
    
    List<T> toDtoAll(List<S> list); //Por ahora user y about hay uno solo
    
    S toEntity(T ojbDTO);
    
}
