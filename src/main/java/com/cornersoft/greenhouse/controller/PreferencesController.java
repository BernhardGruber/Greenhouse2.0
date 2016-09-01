package com.cornersoft.greenhouse.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.cornersoft.greenhouse.util.Helper;
import com.cornersoft.greenhouse.util.JSON;
import com.sdicons.json.model.JSONObject;
import com.sdicons.json.model.JSONString;
import com.sdicons.json.model.JSONValue;

@Controller
public class PreferencesController {
	
	private final String JSON_NAME = "preferences.json";

    @RequestMapping("/rest/prefs/save")
    @ResponseBody
    String save(String key, String value) throws Exception {    	
    	if (value == null)
    		return "{\"status\":\"null\"}";;
    	JSONValue p = (JSONValue)JSON.getJSONFromString(Helper.readFileToString(JSON_NAME, this.getClass()));
    	JSONObject prefObj = (JSONObject)p;
    	prefObj.getValue().remove(key);
    	prefObj.getValue().put(key, new JSONString( value));    	
    	Helper.persistObject(prefObj, JSON_NAME, this.getClass());
    	return "{\"status\":\"Success\"}";
    }

    @RequestMapping("/rest/prefs")
    @ResponseBody
    String prefs() throws Exception {    	
    	return Helper.readFileToString(JSON_NAME, this.getClass());
    }

}
