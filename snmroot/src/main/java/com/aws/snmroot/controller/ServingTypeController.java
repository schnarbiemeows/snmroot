package com.aws.snmroot.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import com.aws.snmroot.hibernate.dao.model.ServingType;
import com.aws.snmroot.hibernate.dao.model.ServingType;
import com.aws.snmroot.hibernate.repository.ServingTypeRepository;

import utility.LogUtil;

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
	
	private LogUtil log = LogUtil.getMasterLogger();
	
	@GetMapping(path="/all")
	public @ResponseBody Iterable<ServingType> getAllServingTypes() {
		log.snmrootLoggerDEBUG("inside servingTypeRepository");
		return servingTypeRepository.findAll();
	}
	
	@GetMapping(path="/findById/{id}")
	public @ResponseBody ServingType findServingTypeById(@PathVariable int id) {
		log.snmrootLoggerDEBUG("inside findServingTypeById");
		Integer primaryKey = new Integer(id);
		Optional<ServingType> servingTypeOptional = servingTypeRepository.findById(primaryKey);
		ServingType results = servingTypeOptional.get();
		return results;
	}
	
	@PostMapping(path="/insert")
	public @ResponseBody ServingType insertServingType(@RequestBody ServingType formData) {
		log.snmrootLoggerDEBUG("inside insertServingType");
		servingTypeRepository.save(formData);
		return formData;
	}
	
	@PostMapping(path="/update")
	public @ResponseBody ServingType updateServingType(@RequestBody ServingType formData) {
		log.snmrootLoggerDEBUG("inside updateServingType");
		servingTypeRepository.save(formData);
		return formData;
	}
	@DeleteMapping(path="/delete/{id}")
	@ResponseStatus(value = HttpStatus.OK)
	public void deleteServingType(@PathVariable int id) {
		log.snmrootLoggerDEBUG("inside deleteServingType");
		Integer primaryKey = new Integer(id);
		servingTypeRepository.deleteById(primaryKey);
	}
	
}
