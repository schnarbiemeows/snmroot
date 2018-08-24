package com.aws.snmroot.controller;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;

import com.aws.snmroot.exception.NotFoundException;
import com.aws.snmroot.hibernate.dao.model.Registration;
import com.aws.snmroot.hibernate.repository.RegistrationRepository;

import utility.LogUtil;
import utility.UtilityClass;

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
	public ResponseEntity<Object> registerAccount(@RequestBody Registration formData) {
		log.snmrootLoggerDEBUG("inside registerAccount");
		try
		{
			formData.setCreated_date(new Date());
			formData.setToken(UtilityClass.randomAlphaNumeric(20));
			formData = registrationRepository.save(formData);
			return ResponseEntity.status(HttpStatus.CREATED).body(formData);
		} catch(DataIntegrityViolationException ev) {
			throw new DataIntegrityViolationException("email already in use");
		}
		catch(Exception e)
		{
			log.snmrootLoggerWARN(e.toString());
			throw e;
		}
	}
	
	@PostMapping(path="/login")
	@ResponseStatus(value = HttpStatus.OK)
	public ResponseEntity<Object> login(@RequestBody Registration formData) {
		log.snmrootLoggerDEBUG("inside login");
		Registration databaseRecord = null;
		try
		{
			if((null==formData.getUsername())||("".equals(formData.getUsername().trim())||
					(null==formData.getPassword())||("".equals(formData.getPassword().trim())))) {
				log.snmrootLoggerWARN("username and/or password is missing");
				ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("username and/or password is missing");
			}
			List<Registration> results = registrationRepository.findByUserName(formData.getUsername());
			if(results!=null&&!results.isEmpty()) {
				databaseRecord =  results.get(0);
				String tempPassword = databaseRecord.getPassword();
				if(!tempPassword.equals(formData.getPassword().trim())) {
					log.snmrootLoggerWARN("password is incorrect");
					return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("password is incorrect");
				}
				else
				{
					databaseRecord.setPassword(null);
					log.snmrootLoggerDEBUG("login successfull");
					return ResponseEntity.status(HttpStatus.OK).body(databaseRecord);
				}
			}
			else {
				log.snmrootLoggerWARN("user not found");
				return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("user not found");
			}
		} 
		catch(Exception e)
		{
			log.snmrootLoggerERROR(e.toString());
			throw e;
		}
	}
	
	@PostMapping(path="/checkUser")
	public ResponseEntity<Object> checkUser(@RequestBody Registration formData) throws Exception {
		log.snmrootLoggerDEBUG("inside checkUser");
		try
		{
			List<Registration> results = registrationRepository.findByUserName(formData.getUsername());
			if(results!=null&&!results.isEmpty()) {
				Registration  newUser = results.get(0);
				newUser.setToken(UtilityClass.randomAlphaNumeric(20));
				registrationRepository.save(newUser);
				log.snmrootLoggerDEBUG("user verified, setting a new token");
				return ResponseEntity.status(HttpStatus.OK).body(newUser);
			}
			else {
				log.snmrootLoggerWARN("user not found");
				throw new NotFoundException("user not found");
			}
		} 
		catch(Exception e)
		{
			log.snmrootLoggerERROR(e.toString());
			throw e;
		}
	}
}
