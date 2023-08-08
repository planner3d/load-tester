package com.example.backend.dao;

import java.util.List;
import java.util.Map;

import com.fasterxml.jackson.databind.JsonNode;

public interface JsonDAO {
	
	Boolean saveTestPlan(JsonNode testPlan);
	
	Boolean saveTestPlanElement(String parentGuid, JsonNode child);
	
	List<?> findChildrenByParentGuid(String parentGuid);
	
	Boolean updateTestPlanElement(String parentGuid, String guid, Map<String, Object> child);

}
