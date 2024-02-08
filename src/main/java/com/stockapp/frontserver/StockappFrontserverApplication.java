package com.stockapp.frontserver;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.loadbalancer.LoadBalanced;
import org.springframework.context.annotation.Bean;
import org.springframework.web.client.RestTemplate;

@SpringBootApplication
public class StockappFrontserverApplication {

	public static void main(String[] args) {
		SpringApplication.run(StockappFrontserverApplication.class, args);
	}

	
	@LoadBalanced
	@Bean
	RestTemplate getRestTemplate(){
		RestTemplate template = new RestTemplate();
        /*
		List interceptors = template.getInterceptors();
        if (interceptors==null){
            template.setInterceptors(Collections.singletonList(new UserContextInterceptor()));
        }
        else{
            interceptors.add(new UserContextInterceptor());
            template.setInterceptors(interceptors);
        }
        */

        return template;
	}
	
}
