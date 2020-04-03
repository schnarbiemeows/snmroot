package com.aws.snmroot.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.aws.snmroot.exception.NotFoundException;
import com.aws.snmroot.exception.UnauthorizedException;
import com.aws.snmroot.hibernate.dao.model.Account;
import com.aws.snmroot.hibernate.repository.AccountRepository;
import com.aws.snmroot.utility.LogUtil;
import com.aws.snmroot.utility.UtilityClass;

/**
 * validation object
 * @author dylan
 *
 */
@Component
public class UserValidator {
	
	/**
	 * accounts repository
	 */
	@Autowired
	AccountRepository accountRepository;
	
	/**
	 * validate if the account has admin rights
	 * @param account
	 * @param log
	 * @return
	 * @throws UnauthorizedException
	 */
	public Account validateAdminRights(Account account, LogUtil log) throws UnauthorizedException{
		if(null==account.getValidated()||!"Y".equals(account.getValidated())||
				null==account.getToken()||null==account.getAdmintoken()||
						null==account.getAdmin()||!"Y".equals(account.getAdmin()))
		{
			log.snmrootLoggerWARN("user not authorized");
			throw new UnauthorizedException("user not authorized");
		}
		/* else
		 * lookup the account by ID #
		 */
		Optional<Account> results = accountRepository.findById(account.getId());
		/* 
		 * if we find an account record
		 */
		if(results.isPresent()) { 
			Account  record = results.get();
			/* 
			 * if either the login token found or admin token found are not the same as 
			 * the tokens passed in, the user is also unauthorized
			 */
			if(null!=record.getValidated()&&!"Y".equals(record.getValidated())) {
					log.snmrootLoggerWARN("user not validated yet");
					throw new NotFoundException("user not validated yet");
			} 
			if(null==record.getAdmintoken()||
					!account.getToken().equals(record.getToken())||
					!account.getAdmintoken().equals(record.getAdmintoken())) {
				log.snmrootLoggerWARN("user not found when attempting to authorize");
				throw new UnauthorizedException("user not authorized");
			}
			record.setToken(UtilityClass.randomAlphaNumeric(20));
			record.setAdmintoken(UtilityClass.randomAlphaNumeric(20));
			log.snmrootLoggerDEBUG("record token = " + record.getToken());
			log.snmrootLoggerDEBUG("record token = " + record.getAdmintoken());
			accountRepository.save(record);
			account.setToken(record.getToken());
			account.setAdmintoken(record.getAdmintoken());
			return account;
		}
		else
		{
			log.snmrootLoggerWARN("user not found when attempting to authorize");
			throw new UnauthorizedException("user not authorized");
		}
	}
}
