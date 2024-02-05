package com.stockapp.frontserver.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class Main {

	@GetMapping("/main")
	String getMain(Model model) {
		
		
		
		return "Main";
	}
	
}
