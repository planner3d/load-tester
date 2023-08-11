package com.example.backend.service;

import java.util.HashSet;
import java.util.Map;
import java.util.Set;

import org.springframework.stereotype.Service;

import com.example.backend.dao.TestPlanDAO;
import com.example.backend.model.JsonFieldModel;
import com.example.backend.model.TestPlanTypeModel;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.node.ObjectNode;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class TestPlanService implements LTTestPlan {
	
	private final TestPlanDAO testPlanDAO;

	@Override
	public Boolean saveTestPlan(JsonNode testPlan) {
		return testPlanDAO
				.saveTestPlan(
						((ObjectNode)testPlan)
							.put(JsonFieldModel.TYPE, TestPlanTypeModel.TEST_PLAN)
					);
	}

	@Override
	public Boolean saveTestPlanElement(JsonNode testElement) {
		return testPlanDAO
				.saveTestPlanElement(
						testElement.get(JsonFieldModel.PARENT_GUID).asText(), 
						testElement.get(JsonFieldModel.CHILD)
				);
	}

	@Override
	public Object findChildrenByParentGuid(String parentGuid) {
		return testPlanDAO
				.findChildrenByParentGuid(parentGuid);
	}
	
	@Override
	public Boolean updateThreadGroup(JsonNode threadGroup) {
		return testPlanDAO
				.updateTestPlanElement(
						threadGroup.get(JsonFieldModel.PARENT_GUID).asText(), 
						threadGroup.get(JsonFieldModel.GUID).asText(),
						threadGroup.get(JsonFieldModel.DATA)
					);
	}

	@Override
	public Boolean updateTestPlanElements(JsonNode[] testElements) {
		Set<Boolean> resultSet = new HashSet<>();
		for (JsonNode testElement: testElements) {
			resultSet.add(
					testPlanDAO
					.updateTestPlanElement(
							testElement.get(JsonFieldModel.PARENT_GUID).asText(), 
							testElement.get(JsonFieldModel.GUID).asText(), 
							testElement.get(JsonFieldModel.DATA)
						)
					);
		}
		return !resultSet.contains(false);
	}

	@Override
	public void deleteDefaultUserCollection() {
		testPlanDAO.deleteDefaultUserCollection();
	}
	
	public String startTestPlan(Map<String, String> testPlanGuid) {
		
		return "";
	}

}