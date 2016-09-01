package com.cornersoft.greenhouse.controller;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.cornersoft.greenhouse.dtos.AirList;
import com.cornersoft.greenhouse.dtos.AirTime;
import com.cornersoft.greenhouse.dtos.SeedingList;
import com.cornersoft.greenhouse.util.Helper;
import com.cornersoft.greenhouse.util.JSON;

@Controller
public class AirController {

	private final String JSON_NAME = "airtimes.json";
	
    @RequestMapping("/rest/air/list")
    @ResponseBody
    String airList() throws Exception {
    	return Helper.readFileToString(JSON_NAME, this.getClass());
    }
    

    @RequestMapping("/rest/air/next")
    @ResponseBody
    String nextAir() throws Exception {
    	AirList airList = (AirList) JSON.deserialize(Helper.readFileToString(JSON_NAME, this.getClass()), AirList.class);
    	DateFormat formatter = new SimpleDateFormat("HH:mm");
    	
    	ArrayList<Date> allTimes = new ArrayList<Date>();
    	for (AirTime a : airList.list){
    		allTimes.add((Date)formatter.parse(a.airtime));
    	}
    	Date now = new Date();
    	Date prev=null;
    	Date next=null;
    	for (Date d : allTimes){
    		if (d.before(now))
    			prev = d;
    		if (d.after(now)){
    			next = d;
    			break;
    		}    			
    	}
    	if (prev == null)
    		prev = allTimes.get(allTimes.size()-1);
    	if (next == null)
    		next = allTimes.get(0);
    	return "{\"last\":\"" + formatter.format(prev) + "\",\"next\":\"" + formatter.format(next) + "\"}";	
    }
    

    @RequestMapping("/rest/air/save")
    @ResponseBody
    String saveAir(String airJson) throws Exception {
    	AirTime air = (AirTime)JSON.deserialize(airJson, AirTime.class);
    	AirList airList = (AirList)JSON.deserialize(Helper.readFileToString(JSON_NAME, this.getClass()), AirList.class);
    	air.id = airList.list.size();
    	airList.list.add(air);
    	Helper.persistObject(airList, JSON_NAME, this.getClass());
    	return "{\"status\":\"Success\"}";
    }

    @RequestMapping("/rest/air/update")
    @ResponseBody
    String updateAir(String airJson) throws Exception {
    	AirTime air = (AirTime)JSON.deserialize(airJson, AirTime.class);
    	AirList airList = (AirList)JSON.deserialize(Helper.readFileToString(JSON_NAME, this.getClass()), SeedingList.class);
    	AirTime old = (AirTime) Helper.removeObjInListById(airList.list, air.id);    	
    	if (old == null)
    		throw new Exception("airUpdate-Error: air not found");
    	
    	old = (AirTime) Helper.updateObjet(old, air);
    	airList.list.add(old);
    	Helper.persistObject(airList, JSON_NAME, this.getClass());
    	return "{\"status\":\"Success\"}";
    }

    @RequestMapping("/rest/air/delete")
    @ResponseBody
    String deleteAir(int id) throws Exception {
    	AirList airList = (AirList)JSON.deserialize(Helper.readFileToString(JSON_NAME, this.getClass()), AirList.class);
    	Helper.removeObjInListById(airList.list, id);
    	Helper.persistObject(airList, JSON_NAME, this.getClass());
    	return "{\"status\":\"Success\"}";
    }
    
 }
