package com.example.backend.service;

import java.util.List;

import org.bson.Document;

import com.fasterxml.jackson.databind.JsonNode;

public interface LTTestPlan {
	
	Boolean saveTestPlan(JsonNode testPlan);
	
	Boolean saveTestPlanElement(JsonNode testElement);
	
	List<Document> findChildrenByParentGuid(String parentGuid);
	
	Boolean updateThreadGroup(JsonNode threadGroup);
	
	Boolean updateTestPlanElements(JsonNode[] testElements);

	void deleteDefaultUserCollection();
	
}
