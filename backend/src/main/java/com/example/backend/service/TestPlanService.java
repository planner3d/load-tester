package com.example.backend.service;

import java.util.HashMap;
import java.util.Map;

import org.bson.Document;
import org.springframework.stereotype.Service;

import com.example.backend.dao.JsonDAO;
import com.example.backend.model.JsonFieldModel;
import com.fasterxml.jackson.databind.JsonNode;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class TestPlanService implements LTTestPlan {
	
	private final JsonDAO jsonDAO;

	@Override
	public Boolean saveTestPlan(JsonNode testPlan) {
		return jsonDAO.saveTestPlan(testPlan);
	}

	@Override
	public Boolean saveTestPlanElement(JsonNode testElement) {
		return jsonDAO
				.saveTestPlanElement(
						testElement.get(JsonFieldModel.PARENT_GUID_FIELD_NAME).asText(), 
						testElement.get(JsonFieldModel.CHILD_FIELD_NAME)
				);
	}

	@Override
	public Object findChildrenByParentGuid(String parentGuid) {
		return jsonDAO
				.findChildrenByParentGuid(parentGuid);
	}

	@Override
	public Boolean updateTestPlanElement(JsonNode testElement) {
		return jsonDAO
				.updateTestPlanElement(
						testElement.get(JsonFieldModel.PARENT_GUID_FIELD_NAME).asText(), 
						testElement.get(JsonFieldModel.GUID_FIELD_NAME).asText(), 
						toMap(testElement.get(JsonFieldModel.CHILD_FIELD_NAME))
					);
	}
	
	private Map<String, Object> toMap (JsonNode child) {
		Map<String, Object> childMap = new HashMap<>();
		child.fields().forEachRemaining(pair -> {
			if (pair.getValue().isNumber())
				childMap.put(pair.getKey(), pair.getValue().numberValue());
			else if (pair.getValue().isTextual())
				childMap.put(pair.getKey(), pair.getValue().asText());
			else if (pair.getValue().isObject())
				childMap.put(pair.getKey(), Document.parse(pair.getValue().toString()));
		});
		return childMap;
	}

}
