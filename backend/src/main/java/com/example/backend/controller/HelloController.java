package com.example.backend.controller;

import java.io.FileOutputStream;
import java.io.FileNotFoundException;
import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.service.JMeterService;
import com.example.backend.service.PlannerObjectService;

@RestController
public class HelloController {

	//private final PlannerObjectService plannerObjectService;
	
	private final JMeterService jMeterService;
	
	private static int count = 0;
	
	public HelloController(JMeterService jMeterService) {
		this.jMeterService = jMeterService;
	}
	
	@GetMapping("/file")
	public void createFile() throws IOException {
		FileOutputStream sw = new FileOutputStream("/usr/share/jmeter/test.log");
		sw.write(12);
		sw.close();
	}
	
	@GetMapping("/hello")
	public String hello() {
		return "hello, world!";
	}
	
	@GetMapping("/load_test")
	public String getTest(@RequestParam String url) throws FileNotFoundException, IOException {
		return jMeterService.getLogs(count++, url);
	}

}
