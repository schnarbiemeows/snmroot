package com.aws.snmroot.controller.forms;

import com.aws.snmroot.hibernate.dao.model.BrandName;
import com.aws.snmroot.hibernate.dao.model.IngredientSubtype;
import com.aws.snmroot.hibernate.dao.model.IngredientType;

public class IngredientTypeListsOutput {

	private Iterable<BrandName> brands;
	private Iterable<IngredientType> ingredientTypes;
	private Iterable<IngredientSubtype> ingredientSubtypes;
	public Iterable<BrandName> getBrands() {
		return brands;
	}
	public void setBrands(Iterable<BrandName> brands) {
		this.brands = brands;
	}
	public Iterable<IngredientType> getIngredientTypes() {
		return ingredientTypes;
	}
	public void setIngredientTypes(Iterable<IngredientType> ingredientTypes) {
		this.ingredientTypes = ingredientTypes;
	}
	public Iterable<IngredientSubtype> getIngredientSubtypes() {
		return ingredientSubtypes;
	}
	public void setIngredientSubtypes(Iterable<IngredientSubtype> ingredientSubtypes) {
		this.ingredientSubtypes = ingredientSubtypes;
	}
	
}
