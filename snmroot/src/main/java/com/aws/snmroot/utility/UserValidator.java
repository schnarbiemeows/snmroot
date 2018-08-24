package com.aws.snmroot.utility;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.aws.snmroot.exception.UnauthorizedException;
import com.aws.snmroot.hibernate.dao.model.Account;
import com.aws.snmroot.hibernate.repository.AccountRepository;

@Component
public class UserValidator {
	@Autowired
	AccountRepository accountRepository;
	private Account account;

	public UserValidator(Account account) {
		super();
		this.account = account;
	}
	
	public Account validateAdminRights(LogUtil log) throws UnauthorizedException{
		if(null==account.getValidated()||!"Y".equals(account.getValidated())||
				null==account.getToken()||null==account.getAdmintoken())
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
			if(null==account.getToken()||
					!account.getToken().equals(record.getToken())||
					!"Y".equals(account.getAdmin())||
					null==account.getAdmintoken()||
					!account.getAdmintoken().equals(record.getAdmintoken())) {
				log.snmrootLoggerWARN("user not found when attempting to authorize");
				throw new UnauthorizedException("user not authorized");
			}
			record.setToken(UtilityClass.randomAlphaNumeric(20));
			record.setAdmintoken(UtilityClass.randomAlphaNumeric(20));
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
