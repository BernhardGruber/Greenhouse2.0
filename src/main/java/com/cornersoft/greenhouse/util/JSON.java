package com.cornersoft.greenhouse.util;

import java.io.ByteArrayInputStream;
import java.io.InputStream;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.sdicons.json.model.JSONValue;
import com.sdicons.json.parser.JSONParser;

public class JSON {
    
	public static Object deserialize(String json, Class<?> targetType) {
        Gson gson = new Gson();
        Object rc = gson.fromJson(json, targetType);
        return rc;
    }

    public static JSONValue getJSONFromString( String json ) throws Exception
    {
        InputStream inputStream = new ByteArrayInputStream(json.getBytes());
        JSONParser jsons = new JSONParser(inputStream);
        return jsons.nextValue();
    }
    /**
     * Serializes any object to JSON.
     *
     * @param object
     * @return
     */
    public static String serialize(Object object) {
        Gson gson = new GsonBuilder().setPrettyPrinting().create();
                
        String json = gson.toJson(object);
        return json;
    }
 
}
