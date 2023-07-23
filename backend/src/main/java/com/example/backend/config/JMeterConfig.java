package com.example.backend.config;

import org.apache.jmeter.util.JMeterUtils;
import org.springframework.beans.factory.annotation.Value;

public class JMeterConfig {
	
	@Value("${jmeter.home}")
	private static String JMeterHomePath = null;
	
	@Value("${jmeter.properties}")
	private static String JMeterPropertiesPath = null;
	
	static {
		JMeterUtils.setJMeterHome(JMeterHomePath);
		JMeterUtils.loadJMeterProperties(JMeterPropertiesPath);
	}

}
