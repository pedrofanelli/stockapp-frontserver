package com.stockapp.frontserver.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.client.RestTemplate;

import com.stockapp.frontserver.DTOs.AggregatesResult;

@Controller
public class Main {

	
	@Autowired
    RestTemplate restTemplate;
	
	@GetMapping(path= {"/main", "/main/{ticker}"})
	String getMain(Model model, @PathVariable(required=false) String ticker) {
	
	if (ticker == null) {
		ticker = "AAPL";
	} else {
		System.out.println(ticker);
	}
		
		
	ParameterizedTypeReference<List<AggregatesResult>> responseType = new ParameterizedTypeReference<List<AggregatesResult>>() {};
		
	ResponseEntity<List<AggregatesResult>> restExchange = restTemplate.exchange(
                        "http://stockapp-apiconnection/livegraph/{ticker}",
                        HttpMethod.GET,
                        null, responseType, ticker);
		
	
	model.addAttribute("listadito", restExchange.getBody());
    model.addAttribute("name", "Peterrrr");
    model.addAttribute("dataTicker", ticker);
	
		return "Main";
	}
	
}
