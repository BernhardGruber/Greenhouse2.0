package com.cornersoft.greenhouse.controller;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.cornersoft.greenhouse.dtos.WaterList;
import com.cornersoft.greenhouse.dtos.WaterTime;
import com.cornersoft.greenhouse.util.Helper;
import com.cornersoft.greenhouse.util.JSON;

@Controller
public class WaterController {
	
	private final String JSON_NAME = "watertimes.json";

    @RequestMapping("/rest/water/list")
    @ResponseBody
    String wateringList() throws Exception {
    	return Helper.readFileToString(JSON_NAME, this.getClass());
    }

    @RequestMapping("/rest/water/next")
    @ResponseBody
    String nextWatering() throws Exception {
    	WaterList waterList = (WaterList) JSON.deserialize(Helper.readFileToString(JSON_NAME, this.getClass()), WaterList.class);
    	DateFormat formatter = new SimpleDateFormat("HH:mm");
    	
    	ArrayList<Date> allTimes = new ArrayList<Date>();
    	for (WaterTime w : waterList.list){
    		allTimes.add((Date)formatter.parse(w.watertime));
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

    @RequestMapping("/rest/water/save")
    @ResponseBody
    String saveWatering(String waterJson) throws Exception {
    	WaterTime water = (WaterTime)JSON.deserialize(waterJson, WaterTime.class);
    	WaterList waterList = (WaterList) JSON.deserialize(Helper.readFileToString(JSON_NAME, this.getClass()), WaterList.class);
    	water.id = waterList.list.size();
    	waterList.list.add(water);
    	Helper.persistObject(waterList, JSON_NAME, this.getClass());
    	return "{\"status\":\"Success\"}";
    }

    @RequestMapping("/rest/water/update")
    @ResponseBody
    String updateWatering(String waterJson) throws Exception {
    	WaterTime water = (WaterTime)JSON.deserialize(waterJson, WaterTime.class);
    	WaterList waterList = (WaterList) JSON.deserialize(Helper.readFileToString(JSON_NAME, this.getClass()), WaterList.class);
    	WaterTime old = (WaterTime)Helper.removeObjInListById(waterList.list, water.id);    	
    	if (old == null)
    		throw new Exception("waterUpdate-Error: water not found");
    	
    	old = (WaterTime)Helper.updateObjet(old, water);
    	waterList.list.add(old);
    	Helper.persistObject(waterList, JSON_NAME, this.getClass());
    	return "{\"status\":\"Success\"}";
    }

    @RequestMapping("/rest/water/delete")
    @ResponseBody
    String deleteWatering(int id) throws Exception {
    	WaterList waterList = (WaterList) JSON.deserialize(Helper.readFileToString(JSON_NAME, this.getClass()), WaterList.class);
    	Helper.removeObjInListById(waterList.list, id);
    	Helper.persistObject(waterList, JSON_NAME, this.getClass());
    	return "{\"status\":\"Success\"}";
    }
    
}
