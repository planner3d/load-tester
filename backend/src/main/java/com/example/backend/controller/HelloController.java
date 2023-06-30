package com.example.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.service.PlannerObjectService;

@RestController
public class HelloController {

	private final PlannerObjectService plannerObjectService;
	
	public HelloController(PlannerObjectService plannerObjectService) {
		this.plannerObjectService = plannerObjectService;
	}
	
	@GetMapping("/hello")
	public String hello() {
		return "hello, world!";
	}
	
	@GetMapping("/catalog")
	public ResponseEntity<?> getCatalogObjects() {
		return ResponseEntity.ok(plannerObjectService.getAll());
	}

}
