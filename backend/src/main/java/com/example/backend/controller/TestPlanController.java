package com.example.backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.service.LTTestPlan;
import com.fasterxml.jackson.databind.JsonNode;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class TestPlanController {
	
	private final LTTestPlan lTTestPlan;
	
	@PostMapping("/test-plan")
	public ResponseEntity<?> saveTestPlan(@RequestBody JsonNode testPlan) {
		return ResponseEntity.ok(lTTestPlan.saveTestPlan(testPlan));
	}
	
	@PostMapping("/test-plan/element")
	public ResponseEntity<?> saveTestPlanElement(@RequestBody JsonNode testElement) {
		return ResponseEntity.ok(lTTestPlan.saveTestPlanElement(testElement));
	}
	
	@GetMapping("/test-plan/element/children")
	public ResponseEntity<?> findChildrenByParentGuid(@RequestParam String parentGuid) {
		return ResponseEntity.ok(lTTestPlan.findChildrenByParentGuid(parentGuid));
	}
	
	@PutMapping("/test-plan/element")
	public ResponseEntity<?> updateTestPlanElement(@RequestBody JsonNode testElement) {
		return ResponseEntity.ok(lTTestPlan.updateTestPlanElement(testElement));
	}

}
