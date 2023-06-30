package com.example.backend.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PlannerObject {
	
	private Long id;
	
	private String name;
	
	private String imageUrl;
	
	private String schemaUrl;

}
