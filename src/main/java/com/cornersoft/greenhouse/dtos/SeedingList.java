package com.cornersoft.greenhouse.dtos;

import java.util.ArrayList;

public class SeedingList {
	public ArrayList<Seeding> list = new ArrayList<Seeding>();
	
	public Seeding findSeeding(int id){
		for (Seeding s : list){
			if (s.id == id)
				return s;
		}
		return null;
	}
}
