package com.cornersoft.greenhouse.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.cornersoft.greenhouse.dtos.Harvest;
import com.cornersoft.greenhouse.dtos.HarvestList;
import com.cornersoft.greenhouse.dtos.Seeding;
import com.cornersoft.greenhouse.dtos.SeedingList;
import com.cornersoft.greenhouse.util.Helper;
import com.cornersoft.greenhouse.util.JSON;

@Controller
public class HarvestController {

	private final String JSON_NAME = "harvests.json";
	
    @RequestMapping("/rest/plants/harvest/list")
    @ResponseBody
    String harvestList() throws Exception {
    	return Helper.readFileToString(JSON_NAME, this.getClass());
    }
	
    @RequestMapping("/rest/plants/harvest/save")
    @ResponseBody
    String saveHarvest(String harvestJson) throws Exception {
    	Harvest harvest = (Harvest) JSON.deserialize(harvestJson, Harvest.class);
    	HarvestList harvestList = (HarvestList) JSON.deserialize(Helper.readFileToString(JSON_NAME, this.getClass()), HarvestList.class);
    	harvest.id = harvestList.list.size()+1;
    	harvestList.list.add(harvest);
    	Helper.persistObject(harvestList, JSON_NAME, this.getClass());
    	return "{\"status\":\"Success\"}";  	
    }
	
    @RequestMapping("/rest/plants/harvest/update")
    @ResponseBody
    String updateHarvest(String harvestJson) throws Exception {
    	Harvest harvest = (Harvest) JSON.deserialize(harvestJson, Harvest.class);
    	HarvestList harvestList = (HarvestList) JSON.deserialize(Helper.readFileToString(JSON_NAME, this.getClass()), HarvestList.class);
    	Harvest old = (Harvest) Helper.removeObjInListById(harvestList.list, harvest.id);    	
    	if (old == null)
    		throw new Exception("harvestUpdate-Error: harvest not found");
    	old = (Harvest) Helper.updateObjet(old, harvest);
    	harvestList.list.add(harvest);
    	Helper.persistObject(harvestList, JSON_NAME, this.getClass());
    	return "{\"status\":\"Success\"}";
    }
	
    @RequestMapping("/rest/plants/harvest/delete")
    @ResponseBody
    String deleteHarvest(int id) throws Exception {
    	HarvestList harvestList = (HarvestList) JSON.deserialize(Helper.readFileToString(JSON_NAME, this.getClass()), HarvestList.class);
    	Helper.removeObjInListById(harvestList.list, id);
    	Helper.persistObject(harvestList, JSON_NAME, this.getClass());
    	return "{\"status\":\"Success\"}";   	
    }
    
    

    @RequestMapping("/rest/plants/harvest/valuelist")
    @ResponseBody
    String valueList(String type, String clientValue) throws Exception {
    	SeedingList seeds = (SeedingList) JSON.deserialize(Helper.readFileToString(JSON_NAME, this.getClass()), SeedingList.class);
    	String result = "";
    	for (Seeding seed : seeds.list){
    		String value = getAttributeValue(type, seed);
    		if (value == null)
    			continue;
    		if (clientValue != null && value.indexOf(clientValue) < 0)
    			continue;
    		if (result.indexOf(value) < 0){
    			if (result.length() == 0)
    				result = "[\"" + value + "\"";
    			else
    				result += ",\"" + value + "\"";
    		}
    	}
    	if (result.length() > 0)
    		result +="]";
    	return result;
    }

    /**
     * get the value of Seeding-object chosen by type
     * @param type	which attribute to choose
     * @param seed	object to get a value from 
     * @return	returns the value defined by type
     */
    private String getAttributeValue(String type, Seeding seed){
    	if (type.equals("vegetable"))
    		return seed.vegetable;
    	else if (type.equals("unit"))
    		return seed.unit;
    	else 
    		throw new RuntimeException("valueList.getAttributeValue-ERROR: type not allowed: " + type);
    }

}
