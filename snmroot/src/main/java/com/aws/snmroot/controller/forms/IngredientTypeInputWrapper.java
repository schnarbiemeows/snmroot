package com.aws.snmroot.controller.forms;

import com.aws.snmroot.hibernate.dao.model.Account;
import com.aws.snmroot.hibernate.dao.model.IngredientType;

public class IngredientTypeInputWrapper {

	private Account account;
	private IngredientType ingredientType;
	public Account getAccount() {
		return account;
	}
	public void setAccount(Account account) {
		this.account = account;
	}
	public IngredientType getIngredientType() {
		return ingredientType;
	}
	public void setIngredientType(IngredientType ingredientType) {
		this.ingredientType = ingredientType;
	}
}
