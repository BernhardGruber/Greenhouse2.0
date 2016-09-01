package com.cornersoft.greenhouse.controller;

import java.util.Calendar;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class MeasureController {
	
	private final String JSON_NAME = "preferences.json";

    @RequestMapping("/rest/measure/temperature")
    @ResponseBody
    String temperature() throws Exception {
    	Calendar c = Calendar.getInstance();
    	int month = c.get(Calendar.MONTH);
    	int intervall = 29;
    	int start = 0;
    	int value = (int)(Math.random() * intervall) + start;
    	return "{\"value\":" + value + "}";
    }

    @RequestMapping("/rest/measure/water")
    @ResponseBody
    String water() throws Exception {
    	int value = (int)(Math.random() * 100) + 1;
    	return "{\"value\":" + value + "}";
    }

    @RequestMapping("/rest/measure/energy")
    @ResponseBody
    String energy() throws Exception {
    	int value = (int)(Math.random() * 100) + 1;
    	return "{\"value\":" + value + "}";
    }


    @RequestMapping("/rest/measure/window")
    @ResponseBody
    String window(Boolean doOpen) throws Exception {
    	if (doOpen == null){
    		doOpen = (int)(Math.random() *10) %2 == 0;
    	}
    	if (doOpen)
    		Thread.sleep(2500);
    	else
    		Thread.sleep(1000);
    	return "{\"windowOpen\":" + doOpen + "}";
    }

    @RequestMapping("/rest/measure/pump")
    @ResponseBody
    String pump(Boolean doStart) throws Exception {
    	if (doStart == null){
    		doStart = (int)(Math.random() *10) %2 == 0;
    	}
    	if (doStart)
    		Thread.sleep(1500);
    	else
    		Thread.sleep(500);
    	return "{\"pumpOn\":" + doStart + "}";
    }
    
    
}
