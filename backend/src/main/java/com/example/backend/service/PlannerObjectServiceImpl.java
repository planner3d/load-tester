package com.example.backend.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.example.backend.entity.PlannerObject;

@Service
public class PlannerObjectServiceImpl implements PlannerObjectService {
	
	private static final List<PlannerObject> plannerObjects = List.of(
		new PlannerObject(
				1L, 
				"Стена", 
				"https://images.ctfassets.net/skkgb8fetgpj/56QaoGMYdWuiEMQYcEIWuY/23a5b2bb32aa653b0771f712de837e5a/aged-blocks-bricks-761142.jpg", 
				""
				),
		new PlannerObject(
				2L, 
				"Окно",
				"https://www.munsterjoinery.ie/media/catalog/product/cache/11d51a9030d0c63b4b89b91cc0841df3/5/a/5a_2.jpg",
				""
				),
		new PlannerObject(
				3L, 
				"Дверь", 
				"https://www.upperdublin.net/wp-content/uploads/2015/03/WoodDoor.jpg", 
				""
				),
		new PlannerObject(
				4L, 
				"Кровать", 
				"https://www.at-home.co.in/cdn/shop/products/TimberlandkingLSWALNUT_23d4ee80-815e-4964-a8b2-06aa99e569f6.jpg?v=1659679856", 
				"https://www.freecads.com/media/thumb/fit/501x353/5bb5f687a4e52.jpg"
				),
		new PlannerObject(
				5L, 
				"Софа", 
				"https://www.ikea.com/pl/pl/images/products/paerup-sofa-2-osobowa-gunnared-ciemnoszary__0950106_pe800217_s5.jpg", 
				"https://www.freecads.com/media/thumb/fit/501x353/5bb5f68c81fb9.jpg"
				),
		new PlannerObject(
				6L, 
				"Лестница", 
				"https://www.tradestairs.com/acatalog/s4n.jpg", 
				"https://www.freecads.com/media/thumb/fit/501x353/5bb5f6952c7be.jpg"
				)
	);

	@Override
	public List<PlannerObject> getAll() {
		return plannerObjects;
	}

}
