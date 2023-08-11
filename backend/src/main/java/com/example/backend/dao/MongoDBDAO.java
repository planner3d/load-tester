package com.example.backend.dao;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import org.bson.Document;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Repository;

import com.example.backend.model.JsonFieldModel;
import com.fasterxml.jackson.databind.JsonNode;
import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class MongoDBDAO implements TestPlanDAO {
	
	private final MongoTemplate mongoTemplate;
	
	private final String DEFAULT_COLLECTION = "user1";
	
	@Override
	public Boolean saveTestPlan(JsonNode testPlan) {
		return !mongoTemplate
					.insert(Document.parse(testPlan.toString()), DEFAULT_COLLECTION)
					.isEmpty();
	}

	@Override
	public Boolean saveTestPlanElement(String parentGuid, JsonNode child) {
		System.out.println(child);
		Query query = new Query(Criteria.where(JsonFieldModel.PARENT_GUID).is(parentGuid));
		Update update = new Update();
		update.push(JsonFieldModel.CHILDREN, Document.parse(child.toString()));
		return mongoTemplate
				.upsert(query, update, DEFAULT_COLLECTION)
				.wasAcknowledged();
	}

	@Override
	public List<?> findChildrenByParentGuid(String parentGuid) {
		Query query = new Query(Criteria
				.where(JsonFieldModel.PARENT_GUID)
				.is(parentGuid)
			);
		return Objects
				.requireNonNullElse(
						mongoTemplate.findOne(query, Document.class, DEFAULT_COLLECTION), 
						new Document()
				)
				.get(JsonFieldModel.CHILDREN, List.class);
	}

	@Override
	public Boolean updateTestPlanElement(String parentGuid, String guid, JsonNode data) {
		List<Criteria> criteria = new ArrayList<>();
		criteria.add(Criteria.where(JsonFieldModel.PARENT_GUID).is(parentGuid));
		criteria
			.add(
					Criteria
						.where(JsonFieldModel.CHILDREN + "." + JsonFieldModel.GUID)
						.is(guid)
				);
		
		Query query = new Query(new Criteria().andOperator(criteria));
		Update update = new Update();
		update.set(JsonFieldModel.CHILDREN + ".$." + JsonFieldModel.DATA, Document.parse(data.toString()));
		
		return mongoTemplate
				.upsert(query, update, DEFAULT_COLLECTION)
				.wasAcknowledged();
	}

	@Override
	public void deleteDefaultUserCollection() {
		mongoTemplate.dropCollection(DEFAULT_COLLECTION);
	}

}
