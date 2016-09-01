package com.cornersoft.greenhouse;

import java.security.Principal;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.SecurityProperties;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.web.csrf.CookieCsrfTokenRepository;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@RestController
public class GreenhouseApp {

	@RequestMapping("/user")
	public Principal user(Principal user) {
		return user;
	}

	@RequestMapping("/resource")
	public Map<String, Object> home() {
		Map<String, Object> model = new HashMap<String, Object>();
		model.put("id", UUID.randomUUID().toString());
		model.put("content", "Hello World");
		return model;
	}

	public static void main(String[] args) {
		SpringApplication.run(GreenhouseApp.class, args);
	}
	

	@Configuration
	@Order(SecurityProperties.ACCESS_OVERRIDE_ORDER)
	protected static class SecurityConfiguration extends WebSecurityConfigurerAdapter {
	    @Override
	    public void configure(WebSecurity web){
	        web.ignoring()
	        .antMatchers("/scripts/**/*.{js,html}")
	        .antMatchers("/views/airList.html")
	        .antMatchers("/views/blog.html")
	        .antMatchers("/views/gallery.html")
	        .antMatchers("/views/harvest.html")
	        .antMatchers("/views/harvestSector.html")
	        .antMatchers("/views/login.html")
	        .antMatchers("/views/measure.html")
	        .antMatchers("/views/modalImg.html")
	        .antMatchers("/views/navBar.html")
	        .antMatchers("/views/schedule.html")
	        .antMatchers("/views/seed.html")
	        .antMatchers("/views/seedSector.html")
	        .antMatchers("/views/start.html")        
	        .antMatchers("/views/waterList.html")
	        .antMatchers("/bower_components/**")
	        .antMatchers("/resources/*.json")
	        .antMatchers("/rest/**");
	    }

	    @Override
		protected void configure(HttpSecurity http) throws Exception {
			http
				.httpBasic().and()
				.authorizeRequests()
					.antMatchers("/index.html", "/index_dev.html", "/").permitAll()
					.anyRequest().authenticated()
					.and()
							
				.csrf()
					.csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse());
			
		}
	}
}