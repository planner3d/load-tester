package com.example.backend.dao;

import java.util.List;

import com.fasterxml.jackson.databind.JsonNode;

public interface TestPlanDAO {
	
	Boolean saveTestPlan(JsonNode testPlan);
	
	Boolean saveTestPlanElement(String parentGuid, JsonNode child);
	
	List<?> findChildrenByParentGuid(String parentGuid);
	
	Boolean updateTestPlanElement(String parentGuid, String guid, JsonNode data);
	
	void deleteDefaultUserCollection();

}
