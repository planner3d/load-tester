package com.example.backend.service;

import com.fasterxml.jackson.databind.JsonNode;

public interface LTTestPlan {
	
	Boolean saveTestPlan(JsonNode testPlan);
	
	Boolean saveTestPlanElement(JsonNode testElement);
	
	Object findChildrenByParentGuid(String parentGuid);
	
	Boolean updateTestPlanElement(JsonNode testElement);

}
