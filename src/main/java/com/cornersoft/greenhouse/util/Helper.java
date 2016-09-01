package com.cornersoft.greenhouse.util;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.lang.reflect.Field;
import java.net.URL;
import java.util.Iterator;
import java.util.List;

import org.apache.commons.io.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;

import com.sdicons.json.model.JSONObject;

public class Helper {

	@Autowired
    private static ResourceLoader resourceLoader;

	/**
	 * set all attribute-values of oldObj to current values of newObj 
	 * @param oldObj
	 * @param newObj
	 * @return oldObj updated with newObj
	 */
	public static Object updateObjet (Object oldObj, Object newObj){
		 Class<?> c = oldObj.getClass();
		 Class<?> cNew = newObj.getClass();
		 Field[] fields = c.getDeclaredFields();
		 Field[] newFields = cNew.getDeclaredFields();

		 for( int i = 0; i < fields.length; i++ ){
			 Field field = fields[i];
			 if (field.getName().equals("id"))
				 continue;
			 Field newField = newFields[i];
		      try {
	        	   field.setAccessible(true);
	        	   field.set(oldObj, newField.get(newObj));
		      } catch (IllegalArgumentException e1) {
		    	  System.out.println("EX: " + e1.getMessage());
		    	  e1.printStackTrace();
		      } catch (IllegalAccessException e1) {
		    	  System.out.println("EX2: " + e1.getMessage());
		    	  e1.printStackTrace();		    	  
		      }
		 }		
		 return oldObj;
	}
	
	/**
	 * find a object in a list by an attribute: id
	 * @param list List
	 * @param id Integer id
	 * @return found object or null if not found
	 */
	public static Object removeObjInListById(List<?> list, Integer id) {
		Iterator<?> iterator = list.iterator();
		try{
			while (iterator.hasNext()){
				Object o = iterator.next();
				Class<?> c = o.getClass();
				Field f = c.getDeclaredField("id");
				if (f.get(o).equals(id)){
					list.remove(o);
					return o;
				}
			}			
		} catch (Exception e){
			System.out.println("ERROR: " + e.getMessage());
			e.printStackTrace();
		}
		return null;
	}
	
	/**
	 * json-serialize an object and save to file 
	 * @param o object to serialize
	 * @throws FileNotFoundException 
	 */
	public static void persistObject(Object o, File file) throws FileNotFoundException{
    	String objString = JSON.serialize(o);
    	if (o instanceof JSONObject)
    		objString = ((JSONObject)o).render(true);
    	PrintWriter pw = new PrintWriter( new FileOutputStream(file));
    	pw.println(objString);
    	pw.close();
		
	}
	
	public static void persistObject(Object o, String fileName, Class<?> clazz) throws FileNotFoundException{
		File file = new File(clazz.getClassLoader().getResource(fileName).getFile());
		persistObject(o, file);
	}
	
	public static String readFileToString(String fileName, Class<?> clazz) throws Exception{
		//URL url = clazz.getClassLoader().getResource(fileName);
		//return readFileToString(url);
		InputStream is =  Helper.class.getClassLoader().getResourceAsStream(fileName);
		String jsonStr = IOUtils.toString(is, "UTF-8"); 
		
		//Resource resource = resourceLoader.getResource("classpath:watertimes.json");
		//Resource template = ctx.getResource("some/resource/path/myTemplate.txt");
        //File dbAsFile = resource.getFile();
        //return readFileToString(dbAsFile);
        return jsonStr;
	}

	/**
	 * read a file into a string
	 * @param resourceName
	 * @return
	 * @throws Exception
	 */
    public static String readFileToString(URL url) throws Exception{   	
    	File file = null;
        file = new File(url.toURI());
        return readFileToString(file);
    }
    

	/**
	 * read a file into a string
	 * @param resourceName
	 * @return
	 * @throws Exception
	 */
    public static String readFileToString(File file) throws Exception{   	
    	BufferedReader reader = null;
    	StringBuilder sb = new StringBuilder();
        try {
            reader = new BufferedReader( new InputStreamReader (new FileInputStream(file), "UTF-8"));
            
            String line = reader.readLine();
            while (line != null){
            	sb.append(line);
            	line = reader.readLine();
            }
            reader.close();
        } catch (Exception e) {
            System.out.println("ERROR: " + e.getMessage());
        } finally {
        	reader.close();
        }
        return sb.toString();
    }
    
    

}
