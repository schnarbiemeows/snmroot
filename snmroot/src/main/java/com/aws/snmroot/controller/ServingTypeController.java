package com.aws.snmroot.controller;

import java.util.NoSuchElementException;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import com.aws.snmroot.controller.forms.DeleteMessage;
import com.aws.snmroot.controller.forms.ServingTypeInputWrapper;
import com.aws.snmroot.exception.DeletedNotFoundException;
import com.aws.snmroot.exception.NotFoundException;
import com.aws.snmroot.hibernate.dao.model.Account;
import com.aws.snmroot.hibernate.dao.model.ServingType;
import com.aws.snmroot.hibernate.repository.ServingTypeRepository;
import com.aws.snmroot.utility.LogUtil;

@Controller
@RequestMapping(path="/servingtype")
public class ServingTypeController {

	/* 
	 * this controller will handle service calls for 
	 * both the serving_type and serving_type_conversion tables
	 * 
	 */
	@Autowired
	ServingTypeRepository servingTypeRepository;
	
	@Autowired
	UserValidator validator;
	
	private LogUtil log = LogUtil.getMasterLogger();
	
	@GetMapping(path="/all")
	public ResponseEntity<Object> getAllServingTypes() {
		log.snmrootLoggerDEBUG("inside servingTypeRepository");
		try {
			Iterable<ServingType> results = servingTypeRepository.findAll();
			log.snmrootLoggerDEBUG("returning list of serving types");
			return ResponseEntity.status(HttpStatus.OK).body(results);
		} catch (Exception e) {
			log.snmrootLoggerWARN(e.toString());
			throw e;
		}
	}
	
	@GetMapping(path="/findById/{id}")
	public ResponseEntity<Object> findServingTypeById(@PathVariable int id) {
		log.snmrootLoggerDEBUG("inside findServingTypeById");
		try {
			Integer primaryKey = new Integer(id);
			Optional<ServingType> servingTypeOptional = servingTypeRepository.findById(primaryKey);
			ServingType results = servingTypeOptional.get();
			log.snmrootLoggerDEBUG("found serving type with id = " + id);
			return ResponseEntity.status(HttpStatus.OK).body(results);
		} catch (NoSuchElementException e1) {
			log.snmrootLoggerWARN(e1.toString());
			throw new NotFoundException("item not found");
		} catch (Exception e) {
			log.snmrootLoggerWARN(e.toString());
			throw e;
		}
	}
	
	@PostMapping(path="/insert")
	public ResponseEntity<Object> insertServingType(@RequestBody ServingTypeInputWrapper formData) throws Exception {
		log.snmrootLoggerDEBUG("inside insertServingType");
		try {
			Account account = formData.getAccount();
			log.snmrootLoggerDEBUG("account token input = " + account.getToken());
			log.snmrootLoggerDEBUG("account token input = " + account.getAdmintoken());
			account = validator.validateAdminRights(account,log);
			formData.setAccount(account);
			ServingType inputRecord = formData.getServingType();
			if(null==inputRecord.getServing_type_desc()||inputRecord.getServing_type_desc().length()<1) {
				throw new Exception("no item description given");
			}
			servingTypeRepository.save(inputRecord);
			log.snmrootLoggerDEBUG("inserted serving type");
			log.snmrootLoggerDEBUG("account token output = " + formData.getAccount().getToken());
			log.snmrootLoggerDEBUG("account token output = " + formData.getAccount().getAdmintoken());
			return ResponseEntity.status(HttpStatus.OK).body(formData);
		} catch (Exception e) {
			log.snmrootLoggerWARN(e.toString());
			throw e;
		}
	}
	
	@PostMapping(path="/update")
	public ResponseEntity<Object> updateServingType(@RequestBody ServingTypeInputWrapper formData) throws Exception {
		log.snmrootLoggerDEBUG("inside updateServingType");
		try {
			Account account = formData.getAccount();
			log.snmrootLoggerDEBUG("account token input = " + account.getToken());
			log.snmrootLoggerDEBUG("account token input = " + account.getAdmintoken());
			account = validator.validateAdminRights(account,log);
			formData.setAccount(account);
			ServingType inputRecord = formData.getServingType();
			if(null==inputRecord.getServing_type_desc()||inputRecord.getServing_type_desc().length()<1) {
				throw new Exception("no item description given");
			}
			servingTypeRepository.save(inputRecord);
			log.snmrootLoggerDEBUG("updated serving type");
			log.snmrootLoggerDEBUG("account token output = " + formData.getAccount().getToken());
			log.snmrootLoggerDEBUG("account token output = " + formData.getAccount().getAdmintoken());
			return ResponseEntity.status(HttpStatus.OK).body(formData);
		} catch (Exception e) {
			log.snmrootLoggerWARN(e.toString());
			throw e;
		}
	}
	@PostMapping(path="/delete")
	public ResponseEntity<Object> deleteServingType(@RequestBody ServingTypeInputWrapper formData) {
		log.snmrootLoggerDEBUG("inside deleteServingType");
		try {
			Account account = formData.getAccount();
			log.snmrootLoggerDEBUG("account token input = " + account.getToken());
			log.snmrootLoggerDEBUG("account token input = " + account.getAdmintoken());
			account = validator.validateAdminRights(account,log);
			ServingType inputRecord = formData.getServingType();
			Integer id = inputRecord.getId();
			servingTypeRepository.deleteById(id);
			log.snmrootLoggerDEBUG("account token output = " + account.getToken());
			log.snmrootLoggerDEBUG("account token output = " + account.getAdmintoken());
			return ResponseEntity.status(HttpStatus.OK).body(new DeleteMessage("serving type with key = " + id + "  deleted",
					account.getToken(),account.getAdmintoken()));
		} catch (EmptyResultDataAccessException emp) {
			log.snmrootLoggerWARN("ingredient type not found!");
			throw new DeletedNotFoundException("serving type not found! could not find the item to be deleted");
		} catch (Exception e) {
			log.snmrootLoggerWARN(e.toString());
			throw e;
		}
	}	
}
