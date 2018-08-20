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

import com.aws.snmroot.controller.forms.IngredientTypeListsOutput;
import com.aws.snmroot.hibernate.dao.model.BrandName;
import com.aws.snmroot.hibernate.dao.model.IngredientSubtype;
import com.aws.snmroot.hibernate.dao.model.IngredientType;
import com.aws.snmroot.hibernate.repository.BrandNameRepository;
import com.aws.snmroot.hibernate.repository.IngredientSubtypeRepository;
import com.aws.snmroot.hibernate.repository.IngredientTypeRepository;

import utility.LogUtil;

@Controller
@RequestMapping(path="/ingredienttype")
public class IngredientTypeController {

	/*
	 * this controller will handle service calls for
	 * the ingredient_type, ingredient_subtype, and brand_name tables
	 * 
	 */
	@Autowired
	BrandNameRepository brandNameRepository;
	
	@Autowired
	IngredientTypeRepository ingredientTypeRepository;
	
	@Autowired
	IngredientSubtypeRepository ingredientSubtypeRepository;
	
	private LogUtil log = LogUtil.getMasterLogger();
	
	@GetMapping(path="/brand/all")
	public @ResponseBody Iterable<BrandName> getAllBrands() {
		log.snmrootLoggerDEBUG("inside getAllBrands");
		return brandNameRepository.findAll();
	}
	
	@GetMapping(path="/maintype/all")
	public @ResponseBody Iterable<IngredientType> getAllItemTypes() {
		log.snmrootLoggerDEBUG("inside getAllItemTypes");
		return ingredientTypeRepository.findAll();
	}
	
	@GetMapping(path="/subtype/all")
	public @ResponseBody Iterable<IngredientSubtype> getAllItemSubtypes() {
		log.snmrootLoggerDEBUG("inside getAllItemSubtypes");
		return ingredientSubtypeRepository.findAll();
	}
	
	@GetMapping(path="/all3lists")
	public @ResponseBody IngredientTypeListsOutput getAll3lists() {
		log.snmrootLoggerDEBUG("inside getAll3lists");
		IngredientTypeListsOutput results = new IngredientTypeListsOutput();
		results.setBrands(brandNameRepository.findAll());
		results.setIngredientTypes(ingredientTypeRepository.findAll());
		results.setIngredientSubtypes(ingredientSubtypeRepository.findAll());
		log.snmrootLoggerDEBUG("exiting getAll3lists");
		return results;
	}
	
	@GetMapping(path="/brand/findById/{id}")
	public @ResponseBody BrandName findBrandById(@PathVariable int id) {
		log.snmrootLoggerDEBUG("inside findBrandById");
		Integer primaryKey = new Integer(id);
		Optional<BrandName> brandNameOptional = brandNameRepository.findById(primaryKey);
		BrandName results = brandNameOptional.get();
		return results;
	}
	
	@GetMapping(path="/maintype/findById/{id}")
	public @ResponseBody IngredientType findIngredientTypeById(@PathVariable int id) {
		log.snmrootLoggerDEBUG("inside findIngredientTypeById");
		Integer primaryKey = new Integer(id);
		Optional<IngredientType> ingredientTypeOptional = ingredientTypeRepository.findById(primaryKey);
		IngredientType results = ingredientTypeOptional.get();
		return results;
	}
	
	@GetMapping(path="/subtype/findById/{id}")
	public @ResponseBody IngredientSubtype findIngredientSubtypeById(@PathVariable int id) {
		log.snmrootLoggerDEBUG("inside findIngredientSubtypeById");
		Integer primaryKey = new Integer(id);
		Optional<IngredientSubtype> ingredientSubtypeOptional = ingredientSubtypeRepository.findById(primaryKey);
		IngredientSubtype results = ingredientSubtypeOptional.get();
		return results;
	}
	
	@PostMapping(path="/brand/insert")
	public @ResponseBody BrandName insertBrand(@RequestBody BrandName formData) {
		log.snmrootLoggerDEBUG("inside insertBrand");
		brandNameRepository.save(formData);
		return formData;
	}
	
	@PostMapping(path="/maintype/insert")
	public @ResponseBody IngredientType insertIngredientType(@RequestBody IngredientType formData) {
		log.snmrootLoggerDEBUG("inside insertIngredientType");
		ingredientTypeRepository.save(formData);
		return formData;
	}
	
	@PostMapping(path="/subtype/insert")
	public @ResponseBody IngredientSubtype insertIngredientSubtype(@RequestBody IngredientSubtype formData) {
		log.snmrootLoggerDEBUG("inside insertIngredientSubtype");
		ingredientSubtypeRepository.save(formData);
		return formData;
	}
	
	@PostMapping(path="/brand/update")
	public @ResponseBody BrandName updateBrand(@RequestBody BrandName formData) {
		log.snmrootLoggerDEBUG("inside updateBrand");
		brandNameRepository.save(formData);
		return formData;
	}
	
	@PostMapping(path="/maintype/update")
	public @ResponseBody IngredientType updateIngredientType(@RequestBody IngredientType formData) {
		log.snmrootLoggerDEBUG("inside updateIngredientType");
		ingredientTypeRepository.save(formData);
		return formData;
	}
	
	@PostMapping(path="/subtype/update")
	public @ResponseBody IngredientSubtype updateIngredientSubtype(@RequestBody IngredientSubtype formData) {
		log.snmrootLoggerDEBUG("inside updateIngredientSubtype");
		ingredientSubtypeRepository.save(formData);
		return formData;
	}
	
	@DeleteMapping(path="/brand/delete/{id}")
	@ResponseStatus(value = HttpStatus.OK)
	public void deleteBrand(@PathVariable int id) {
		log.snmrootLoggerDEBUG("inside deleteBrand");
		Integer primaryKey = new Integer(id);
		brandNameRepository.deleteById(primaryKey);
	}
	
	@DeleteMapping(path="/maintype/delete/{id}")
	@ResponseStatus(value = HttpStatus.OK)
	public void deleteIngredientType(@PathVariable int id) {
		log.snmrootLoggerDEBUG("inside deleteIngredientType");
		Integer primaryKey = new Integer(id);
		ingredientTypeRepository.deleteById(primaryKey);
	}
	
	@DeleteMapping(path="/subtype/delete/{id}")
	@ResponseStatus(value = HttpStatus.OK)
	public void deleteIngredientSubtype(@PathVariable int id) {
		log.snmrootLoggerDEBUG("inside deleteIngredientSubtype");
		Integer primaryKey = new Integer(id);
		ingredientSubtypeRepository.deleteById(primaryKey);
	}
}
