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

import com.aws.snmroot.controller.forms.BrandNameInputWrapper;
import com.aws.snmroot.controller.forms.DeleteMessage;
import com.aws.snmroot.controller.forms.IngredientSubTypeInputWrapper;
import com.aws.snmroot.controller.forms.IngredientTypeInputWrapper;
import com.aws.snmroot.controller.forms.IngredientTypeListsOutput;
import com.aws.snmroot.exception.DeletedNotFoundException;
import com.aws.snmroot.exception.NotFoundException;
import com.aws.snmroot.hibernate.dao.model.Account;
import com.aws.snmroot.hibernate.dao.model.BrandName;
import com.aws.snmroot.hibernate.dao.model.IngredientSubtype;
import com.aws.snmroot.hibernate.dao.model.IngredientType;
import com.aws.snmroot.hibernate.dao.model.ServingType;
import com.aws.snmroot.hibernate.repository.BrandNameRepository;
import com.aws.snmroot.hibernate.repository.IngredientSubtypeRepository;
import com.aws.snmroot.hibernate.repository.IngredientTypeRepository;
import com.aws.snmroot.utility.LogUtil;

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
	
	@Autowired
	UserValidator validator;
	
	private LogUtil log = LogUtil.getMasterLogger();
	
	@GetMapping(path="/brand/all")
	public ResponseEntity<Object> getAllBrands() {
		log.snmrootLoggerDEBUG("inside getAllBrands");
		try {
			Iterable<BrandName> brands = brandNameRepository.findAll();
			log.snmrootLoggerDEBUG("returning list of brand names");
			return ResponseEntity.status(HttpStatus.OK).body(brands);
		} catch (Exception e) {
			log.snmrootLoggerWARN(e.toString());
			throw e;
		}
	}
	
	@GetMapping(path="/maintype/all")
	public ResponseEntity<Object> getAllItemTypes() {
		log.snmrootLoggerDEBUG("inside getAllItemTypes");
		try {
			Iterable<IngredientType> results = ingredientTypeRepository.findAll();
			log.snmrootLoggerDEBUG("returning list of ingredient types");
			return ResponseEntity.status(HttpStatus.OK).body(results);
		} catch (Exception e) {
			log.snmrootLoggerWARN(e.toString());
			throw e;
		}
	}
	
	@GetMapping(path="/subtype/all")
	public ResponseEntity<Object> getAllItemSubtypes() {
		log.snmrootLoggerDEBUG("inside getAllItemSubtypes");
		try {
			Iterable<IngredientSubtype> results =  ingredientSubtypeRepository.findAll();
			log.snmrootLoggerDEBUG("returning list of ingredient subtypes");
			return ResponseEntity.status(HttpStatus.OK).body(results);
		} catch (Exception e) {
			log.snmrootLoggerWARN(e.toString());
			throw e;
		}
	}
	
	@GetMapping(path="/all3lists")
	public ResponseEntity<Object> getAll3lists() {
		log.snmrootLoggerDEBUG("inside getAll3lists");
		try {
			IngredientTypeListsOutput results = new IngredientTypeListsOutput();
			results.setBrands(brandNameRepository.findAll());
			results.setIngredientTypes(ingredientTypeRepository.findAll());
			results.setIngredientSubtypes(ingredientSubtypeRepository.findAll());
			log.snmrootLoggerDEBUG("exiting getAll3lists");
			return ResponseEntity.status(HttpStatus.OK).body(results);
		} catch (Exception e) {
			log.snmrootLoggerWARN(e.toString());
			throw e;
		}
	}
	
	@GetMapping(path="/brand/findById/{id}")
	public ResponseEntity<Object> findBrandById(@PathVariable int id) {
		log.snmrootLoggerDEBUG("inside findBrandById");
		try {
			Integer primaryKey = new Integer(id);
			Optional<BrandName> brandNameOptional = brandNameRepository.findById(primaryKey);
			BrandName results = brandNameOptional.get();
			log.snmrootLoggerDEBUG("returning brand name with id = " + id);
			return ResponseEntity.status(HttpStatus.OK).body(results);
		} catch (NoSuchElementException e1) {
			log.snmrootLoggerWARN(e1.toString());
			throw new NotFoundException("item not found");
		} catch (Exception e) {
			log.snmrootLoggerWARN(e.toString());
			throw e;
		}
	}
	
	@GetMapping(path="/maintype/findById/{id}")
	public ResponseEntity<Object> findIngredientTypeById(@PathVariable int id) {
		log.snmrootLoggerDEBUG("inside findIngredientTypeById");
		try {
			Integer primaryKey = new Integer(id);
			Optional<IngredientType> ingredientTypeOptional = ingredientTypeRepository.findById(primaryKey);
			IngredientType results = ingredientTypeOptional.get();
			log.snmrootLoggerDEBUG("returning ingredient type with id = " + id);
			return ResponseEntity.status(HttpStatus.OK).body(results);
		} catch (NoSuchElementException e1) {
			log.snmrootLoggerWARN(e1.toString());
			throw new NotFoundException("item not found");
		} catch (Exception e) {
			log.snmrootLoggerWARN(e.toString());
			throw e;
		}
	}
	
	@GetMapping(path="/subtype/findById/{id}")
	public ResponseEntity<Object> findIngredientSubtypeById(@PathVariable int id) {
		log.snmrootLoggerDEBUG("inside findIngredientSubtypeById");
		try {
			Integer primaryKey = new Integer(id);
			Optional<IngredientSubtype> ingredientSubtypeOptional = ingredientSubtypeRepository.findById(primaryKey);
			IngredientSubtype results = ingredientSubtypeOptional.get();
			log.snmrootLoggerDEBUG("returning ingredient subtype with id = " + id);
			return ResponseEntity.status(HttpStatus.OK).body(results);
		} catch (NoSuchElementException e1) {
			log.snmrootLoggerWARN(e1.toString());
			throw new NotFoundException("item not found");
		} catch (Exception e) {
			log.snmrootLoggerWARN(e.toString());
			throw e;
		}
	}
	
	@PostMapping(path="/brand/insert")
	public ResponseEntity<Object> insertBrand(@RequestBody BrandNameInputWrapper formData) throws Exception {
		log.snmrootLoggerDEBUG("inside insertBrand");
		try {
			Account account = formData.getAccount();
			log.snmrootLoggerDEBUG("account token input = " + account.getToken());
			log.snmrootLoggerDEBUG("account token input = " + account.getAdmintoken());
			account = validator.validateAdminRights(account,log);
			formData.setAccount(account);
			BrandName brandName = formData.getBrandName();
			if(null==brandName.getBrand_name_desc()||brandName.getBrand_name_desc().length()<1) {
				throw new Exception("no item description given");
			}
			brandNameRepository.save(brandName);
			log.snmrootLoggerDEBUG("inserted brand name");
			log.snmrootLoggerDEBUG("account token output = " + formData.getAccount().getToken());
			log.snmrootLoggerDEBUG("account token output = " + formData.getAccount().getAdmintoken());
			return ResponseEntity.status(HttpStatus.OK).body(formData);
		} catch (Exception e) {
			log.snmrootLoggerWARN(e.toString());
			throw e;
		}
	}
	
	@PostMapping(path="/maintype/insert")
	public ResponseEntity<Object> insertIngredientType(@RequestBody IngredientTypeInputWrapper formData) throws Exception {
		log.snmrootLoggerDEBUG("inside insertIngredientType");
		try {
			Account account = formData.getAccount();
			log.snmrootLoggerDEBUG("account token input = " + account.getToken());
			log.snmrootLoggerDEBUG("account token input = " + account.getAdmintoken());
			account = validator.validateAdminRights(account,log);
			formData.setAccount(account);
			IngredientType inputRecord = formData.getIngredientType();
			if(null==inputRecord.getIngredient_type_desc()||inputRecord.getIngredient_type_desc().length()<1) {
				throw new Exception("no item description given");
			}
			ingredientTypeRepository.save(inputRecord);
			log.snmrootLoggerDEBUG("inserted ingredient type");
			log.snmrootLoggerDEBUG("account token output = " + formData.getAccount().getToken());
			log.snmrootLoggerDEBUG("account token output = " + formData.getAccount().getAdmintoken());
			return ResponseEntity.status(HttpStatus.OK).body(formData);
		} catch (Exception e) {
			log.snmrootLoggerWARN(e.toString());
			throw e;
		}
	}
	
	@PostMapping(path="/subtype/insert")
	public ResponseEntity<Object> insertIngredientSubtype(@RequestBody IngredientSubTypeInputWrapper formData) throws Exception {
		log.snmrootLoggerDEBUG("inside insertIngredientSubtype");
		try {
			Account account = formData.getAccount();
			log.snmrootLoggerDEBUG("account token input = " + account.getToken());
			log.snmrootLoggerDEBUG("account token input = " + account.getAdmintoken());
			account = validator.validateAdminRights(account,log);
			formData.setAccount(account);
			IngredientSubtype inputRecord = formData.getIngredientSubtype();
			if(null==inputRecord.getIngredient_subtype_desc()||inputRecord.getIngredient_subtype_desc().length()<1) {
				throw new Exception("no item description given");
			}
			ingredientSubtypeRepository.save(inputRecord);
			log.snmrootLoggerDEBUG("inserted ingredient subtype");
			log.snmrootLoggerDEBUG("account token output = " + formData.getAccount().getToken());
			log.snmrootLoggerDEBUG("account token output = " + formData.getAccount().getAdmintoken());
			return ResponseEntity.status(HttpStatus.OK).body(formData);
		} catch (Exception e) {
			log.snmrootLoggerWARN(e.toString());
			throw e;
		}
	}
	
	@PostMapping(path="/brand/update")
	public ResponseEntity<Object> updateBrand(@RequestBody BrandNameInputWrapper formData) throws Exception {
		log.snmrootLoggerDEBUG("inside updateBrand");
		try {
			Account account = formData.getAccount();
			log.snmrootLoggerDEBUG("account token input = " + account.getToken());
			log.snmrootLoggerDEBUG("account token input = " + account.getAdmintoken());
			account = validator.validateAdminRights(account,log);
			formData.setAccount(account);
			BrandName brandName = formData.getBrandName();
			if(null==brandName.getBrand_name_desc()||brandName.getBrand_name_desc().length()<1) {
				throw new Exception("no item description given");
			}
			brandNameRepository.save(brandName);
			log.snmrootLoggerDEBUG("updated brand name");
			log.snmrootLoggerDEBUG("account token output = " + formData.getAccount().getToken());
			log.snmrootLoggerDEBUG("account token output = " + formData.getAccount().getAdmintoken());
			return ResponseEntity.status(HttpStatus.OK).body(formData);
		} catch (Exception e) {
			log.snmrootLoggerWARN(e.toString());
			throw e;
		}
	}
	
	@PostMapping(path="/maintype/update")
	public ResponseEntity<Object> updateIngredientType(@RequestBody IngredientTypeInputWrapper formData) throws Exception {
		log.snmrootLoggerDEBUG("inside updateIngredientType");
		try {
			Account account = formData.getAccount();
			log.snmrootLoggerDEBUG("account token input = " + account.getToken());
			log.snmrootLoggerDEBUG("account token input = " + account.getAdmintoken());
			account = validator.validateAdminRights(account,log);
			formData.setAccount(account);
			IngredientType inputRecord = formData.getIngredientType();
			if(null==inputRecord.getIngredient_type_desc()||inputRecord.getIngredient_type_desc().length()<1) {
				throw new Exception("no item description given");
			}
			ingredientTypeRepository.save(inputRecord);
			log.snmrootLoggerDEBUG("updated ingredient type");
			log.snmrootLoggerDEBUG("account token output = " + formData.getAccount().getToken());
			log.snmrootLoggerDEBUG("account token output = " + formData.getAccount().getAdmintoken());
			return ResponseEntity.status(HttpStatus.OK).body(formData);
		} catch (Exception e) {
			log.snmrootLoggerWARN(e.toString());
			throw e;
		}
	}
	
	@PostMapping(path="/subtype/update")
	public ResponseEntity<Object> updateIngredientSubtype(@RequestBody IngredientSubTypeInputWrapper formData) throws Exception {
		log.snmrootLoggerDEBUG("inside updateIngredientSubtype");
		try {
			Account account = formData.getAccount();
			log.snmrootLoggerDEBUG("account token input = " + account.getToken());
			log.snmrootLoggerDEBUG("account token input = " + account.getAdmintoken());
			account = validator.validateAdminRights(account,log);
			formData.setAccount(account);
			IngredientSubtype inputRecord = formData.getIngredientSubtype();
			if(null==inputRecord.getIngredient_subtype_desc()||inputRecord.getIngredient_subtype_desc().length()<1) {
				throw new Exception("no item description given");
			}
			ingredientSubtypeRepository.save(inputRecord);
			log.snmrootLoggerDEBUG("updated ingredient subtype");
			log.snmrootLoggerDEBUG("account token output = " + formData.getAccount().getToken());
			log.snmrootLoggerDEBUG("account token output = " + formData.getAccount().getAdmintoken());
			return ResponseEntity.status(HttpStatus.OK).body(formData);
		} catch (Exception e) {
			log.snmrootLoggerWARN(e.toString());
			throw e;
		}
	}
	
	@PostMapping(path="/brand/delete")
	public ResponseEntity<Object> deleteBrand(@RequestBody BrandNameInputWrapper formData) {
		log.snmrootLoggerDEBUG("inside deleteBrand");
		try {
			Account account = formData.getAccount();
			log.snmrootLoggerDEBUG("account token input = " + account.getToken());
			log.snmrootLoggerDEBUG("account token input = " + account.getAdmintoken());
			account = validator.validateAdminRights(account,log);
			BrandName brandName = formData.getBrandName();
			Integer id = brandName.getId();
			brandNameRepository.deleteById(id);
			log.snmrootLoggerDEBUG("deleted brand name");
			log.snmrootLoggerDEBUG("account token output = " + account.getToken());
			log.snmrootLoggerDEBUG("account token output = " + account.getAdmintoken());
			return ResponseEntity.status(HttpStatus.OK).body(new DeleteMessage("brand name with key = " + id + " deleted",
					account.getToken(),account.getAdmintoken()));
		} catch (EmptyResultDataAccessException emp) {
			log.snmrootLoggerWARN("ingredient type not found!");
			throw new DeletedNotFoundException("brand name not found! could not find the item to be deleted");
		} catch (Exception e) {
			log.snmrootLoggerWARN(e.toString());
			throw e;
		}
	}
	
	@PostMapping(path="/maintype/delete")
	public ResponseEntity<Object> deleteIngredientType(@RequestBody IngredientTypeInputWrapper formData) {
		log.snmrootLoggerDEBUG("inside deleteIngredientType");
		try {
			Account account = formData.getAccount();
			log.snmrootLoggerDEBUG("account token input = " + account.getToken());
			log.snmrootLoggerDEBUG("account token input = " + account.getAdmintoken());
			account = validator.validateAdminRights(account,log);
			IngredientType inputRecord = formData.getIngredientType();
			Integer id = inputRecord.getId();
			ingredientTypeRepository.deleteById(id);
			log.snmrootLoggerDEBUG("deleted ingredient type");
			log.snmrootLoggerDEBUG("account token output = " + account.getToken());
			log.snmrootLoggerDEBUG("account token output = " + account.getAdmintoken());
			return ResponseEntity.status(HttpStatus.OK).body(new DeleteMessage("ingredient type with key = " + id + " deleted",
					account.getToken(),account.getAdmintoken()));
		} catch(EmptyResultDataAccessException emp) {
			log.snmrootLoggerWARN("ingredient type not found!");
			throw new DeletedNotFoundException("ingredient type not found! could not find the item to be deleted");
		} catch (Exception e) {
			log.snmrootLoggerWARN(e.toString());
			throw e;
		}
	}
	
	@PostMapping(path="/subtype/delete")
	public ResponseEntity<Object> deleteIngredientSubtype(@RequestBody IngredientSubTypeInputWrapper formData) {
		log.snmrootLoggerDEBUG("inside deleteIngredientSubtype");
		try {
			Account account = formData.getAccount();
			log.snmrootLoggerDEBUG("account token input = " + account.getToken());
			log.snmrootLoggerDEBUG("account token input = " + account.getAdmintoken());
			account = validator.validateAdminRights(account,log);
			IngredientSubtype inputRecord = formData.getIngredientSubtype();
			Integer id = inputRecord.getId();
			ingredientSubtypeRepository.deleteById(id);
			log.snmrootLoggerDEBUG("deleted ingredient subtype");
			log.snmrootLoggerDEBUG("account token output = " + account.getToken());
			log.snmrootLoggerDEBUG("account token output = " + account.getAdmintoken());
			return ResponseEntity.status(HttpStatus.OK).body(new DeleteMessage("ingredient subtype with key = " + id + " deleted",
					account.getToken(),account.getAdmintoken()));
		} catch (EmptyResultDataAccessException emp) {
			log.snmrootLoggerWARN("ingredient type not found!");
			throw new DeletedNotFoundException("ingredient subttype not found! could not find the item to be deleted");
		} catch (Exception e) {
			log.snmrootLoggerWARN(e.toString());
			throw e;
		}
	}
}
