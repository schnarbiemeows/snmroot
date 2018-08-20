package com.aws.snmroot.controller;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.aws.snmroot.hibernate.dao.model.Registration;
import com.aws.snmroot.hibernate.repository.RegistrationRepository;

import utility.LogUtil;

@Controller
@RequestMapping(path="/login")
public class LoginController {

	/* 
	 * this controller will handle service calls for both registering and logging in
	 */
	
	@Autowired
	RegistrationRepository registrationRepository;
	
	private LogUtil log = LogUtil.getMasterLogger();
	
	@PostMapping(path="/register")
	public @ResponseBody Registration registerAccount(@RequestBody Registration formData) {
		log.snmrootLoggerDEBUG("inside insertBrand");
		try
		{
			formData.setCreated_date(new Date());
			formData.setToken("token");
			formData = registrationRepository.save(formData);
			return formData;
		} 
		catch(Exception e)
		{
			log.snmrootLoggerDEBUG(e.toString());
			throw e;
		}
	}
	
	@PostMapping(path="/login")
	public @ResponseBody Registration login(@RequestBody Registration formData) throws Exception {
		log.snmrootLoggerDEBUG("inside insertBrand");
		try
		{
			if((null==formData.getUsername())||("".equals(formData.getUsername().trim())||
					(null==formData.getPassword())||("".equals(formData.getPassword().trim())))) {
				throw new Exception("username and/or password is missing");
			}
			List<Registration> results = registrationRepository.findByUserName(formData.getUsername());
			if(results!=null&&!results.isEmpty()) {
				Registration databaseRecord =  results.get(0);
				String tempPassword = databaseRecord.getPassword();
				if(!tempPassword.equals(formData.getPassword().trim())) {
					throw new Exception("username or password is incorrect");
				}
				else
				{
					return formData;
				}
			}
			else {
				throw new Exception("user not found");
			}
		} 
		catch(Exception e)
		{
			log.snmrootLoggerDEBUG(e.toString());
			throw e;
		}
	}
	
	@PostMapping(path="/checkUser")
	public @ResponseBody Registration checkUser(@RequestBody Registration formData) throws Exception {
		log.snmrootLoggerDEBUG("inside insertBrand");
		try
		{
			List<Registration> results = registrationRepository.findByUserName(formData.getUsername());
			if(results!=null&&!results.isEmpty()) {
				return results.get(0);
			}
			else {
				throw new Exception("user not found");
			}
		} 
		catch(Exception e)
		{
			log.snmrootLoggerDEBUG(e.toString());
			throw e;
		}
	}
}
