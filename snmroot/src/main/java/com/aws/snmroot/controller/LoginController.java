package com.aws.snmroot.controller;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;

import com.aws.snmroot.exception.LoginException;
import com.aws.snmroot.exception.NotFoundException;
import com.aws.snmroot.hibernate.dao.model.Account;
import com.aws.snmroot.hibernate.repository.AccountRepository;
import com.aws.snmroot.utility.LogUtil;
import com.aws.snmroot.utility.UtilityClass;

@Controller
@RequestMapping(path="/login")
public class LoginController {

	/* 
	 * this controller will handle service calls for both registering and logging in
	 */
	
	@Autowired
	AccountRepository accountRepository;
	
	private LogUtil log = LogUtil.getMasterLogger();
	
	@PostMapping(path="/register")
	public ResponseEntity<Object> registerAccount(@Valid @RequestBody Account formData) {
		log.snmrootLoggerDEBUG("inside registerAccount");
		try
		{
			formData.setCreated_date(new Date());
			formData.setToken(UtilityClass.randomAlphaNumeric(20));
			formData = accountRepository.save(formData);
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
	public ResponseEntity<Object> login(@Valid @RequestBody Account formData) {
		log.snmrootLoggerDEBUG("inside login");
		Account databaseRecord = null;
		try
		{
			if((null==formData.getUsername())||("".equals(formData.getUsername().trim())||
					(null==formData.getPassword())||("".equals(formData.getPassword().trim())))) {
				log.snmrootLoggerWARN("username and/or password is missing");
				throw new LoginException("username and/or password is missing");
			}
			List<Account> results = accountRepository.findByUserName(formData.getUsername());
			if(results!=null&&!results.isEmpty()) {
				databaseRecord =  results.get(0);
				String tempPassword = databaseRecord.getPassword();
				if(!tempPassword.equals(formData.getPassword().trim())) {
					log.snmrootLoggerWARN("password is incorrect");
					throw new LoginException("password is incorrect");
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
				throw new NotFoundException("user not found");
			}
		} 
		catch(Exception e)
		{
			log.snmrootLoggerERROR(e.toString());
			throw e;
		}
	}
	
	@PostMapping(path="/checkUser")
	public ResponseEntity<Object> checkUser(@RequestBody Account formData) throws Exception {
		log.snmrootLoggerDEBUG("inside checkUser");
		try
		{
			List<Account> results = accountRepository.findByUserName(formData.getUsername());
			if(results!=null&&!results.isEmpty()) {
				Account  newUser = results.get(0);
				newUser.setToken(UtilityClass.randomAlphaNumeric(20));
				accountRepository.save(newUser);
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
	
	/* 
	 * this method is for the init() method on the table pages, we need to validate their account
	 */
	@PostMapping(path="/validate")
	public ResponseEntity<Object> validateUser(@RequestBody Account formData) throws Exception {
		log.snmrootLoggerDEBUG("inside validateUser");
		try
		{
			/*
			 * if the user has not yet validated their account via clicking the email 
			 * link(put in later)
			 * */
			if(null==formData.getValidated()||!"Y".equals(formData.getValidated()))
			{
				log.snmrootLoggerWARN("user not validated yet");
				throw new NotFoundException("user not validated yet");
			}
			/* else
			 * lookup the account by ID #
			 */
			Optional<Account> results = accountRepository.findById(formData.getId());
			/* 
			 * if we find an account record
			 */
			if(results.isPresent()) { 
				Account  user = results.get();
				/* 
				 * if the login token is the same as the token passed in
				 */
				if(null!=user.getValidated()&&!"Y".equals(user.getValidated())) {
					log.snmrootLoggerWARN("user not validated yet");
					throw new NotFoundException("user not validated yet");
				}
				if(null!=user.getToken()&&user.getToken().equals(formData.getToken())) {
					// regenerate the token
					user.setToken(UtilityClass.randomAlphaNumeric(20));
					/*
					 * check to see if the user is admin, and set the admin flag to true if 
					 * this is so, and generate a new token
					 */
					if(null!=user.getAdmintoken()&&user.getAdmintoken().equals(formData.getAdmintoken())) {
						user.setAdmintoken(UtilityClass.randomAlphaNumeric(20));
					}
					/*
					 * persist the updated tokens to the record
					 * 
					 * TODO later - noting yet for the subscriber token
					 */
					accountRepository.save(user);
					log.snmrootLoggerDEBUG("user verified, setting a new token(s)");
					return ResponseEntity.status(HttpStatus.OK).body(user);
				} // otherwise, the user is invalid
				else {
					log.snmrootLoggerWARN("user token not valid");
					throw new NotFoundException("user token not valid");
				}
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
