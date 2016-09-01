package com.cornersoft.greenhouse.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.cornersoft.greenhouse.dtos.Seeding;
import com.cornersoft.greenhouse.dtos.SeedingList;
import com.cornersoft.greenhouse.util.Helper;
import com.cornersoft.greenhouse.util.JSON;

@RestController
public class PlantsController {
	
	private final String JSON_NAME = "seeds.json";

    @RequestMapping("/plants")
    @ResponseBody
    String home2() {
        return "<a href=/>..</a><br><a href=plants/seed>seed</a><br><a href=plants/harvest>harvest</a>";
    }

    @RequestMapping("/rest/plants/seeds/list")
    @ResponseBody
    String seedList() throws Exception {   
    	return Helper.readFileToString(JSON_NAME, this.getClass());
    }

    @RequestMapping("/rest/plants/seeds/save")
    @ResponseBody
    String seedSave(String seedJson) throws Exception {
    	Seeding seed = (Seeding)JSON.deserialize(seedJson, Seeding.class);
    	SeedingList seeds = (SeedingList) JSON.deserialize(Helper.readFileToString(JSON_NAME, this.getClass()), SeedingList.class);
    	seed.id = seeds.list.size()+1;
    	seeds.list.add(seed);
    	Helper.persistObject(seeds, JSON_NAME, this.getClass());
    	return "{\"status\":\"Success\"}";
    }

    @RequestMapping("/rest/plants/seeds/update")
    @ResponseBody
    String seedUpdate(String seedJson) throws Exception {
    	Seeding seed = (Seeding)JSON.deserialize(seedJson, Seeding.class);
    	SeedingList seeds = (SeedingList) JSON.deserialize(Helper.readFileToString(JSON_NAME, this.getClass()), SeedingList.class);
    	Seeding oldSeed = (Seeding) Helper.removeObjInListById(seeds.list, new Integer(seed.id));
    	if (oldSeed == null)
    		throw new Exception("seedUpdate-ERROR: seed not found");
    	oldSeed = (Seeding) Helper.updateObjet(oldSeed, seed);
    	seeds.list.add(oldSeed);
    	Helper.persistObject(seed, JSON_NAME, this.getClass());
    	return "{\"status\":\"Success\"}";
    }

    @RequestMapping("/rest/plants/seeds/delete")
    @ResponseBody
    String seedSave(int id) throws Exception {
    	SeedingList seeds = (SeedingList) JSON.deserialize(Helper.readFileToString(JSON_NAME, this.getClass()), SeedingList.class);
    	Helper.removeObjInListById(seeds.list, id);
    	Helper.persistObject(seeds, JSON_NAME, this.getClass());
    	return "{\"status\":\"Success\"}";
    }

    @RequestMapping("/rest/plants/seeds/valuelist")
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
