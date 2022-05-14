package com.gottig.portfolio;

import org.modelmapper.ModelMapper;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;


/**
 *
 * @author gottig
 */
@SpringBootApplication
public class PortfolioApplication {

    
    @Bean
    public ModelMapper modelMapper(){
        return new ModelMapper(); 
    }
    
    public static void main(String[] args) {
		SpringApplication.run(PortfolioApplication.class, args);
	}

}
