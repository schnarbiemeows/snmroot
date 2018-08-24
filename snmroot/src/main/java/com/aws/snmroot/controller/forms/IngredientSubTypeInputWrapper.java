package com.aws.snmroot.controller.forms;

import com.aws.snmroot.hibernate.dao.model.Account;
import com.aws.snmroot.hibernate.dao.model.IngredientSubtype;

public class IngredientSubTypeInputWrapper {

	private Account account;
	private IngredientSubtype ingredientSubtype;
	public Account getAccount() {
		return account;
	}
	public void setAccount(Account account) {
		this.account = account;
	}
	public IngredientSubtype getIngredientSubtype() {
		return ingredientSubtype;
	}
	public void setIngredientSubtype(IngredientSubtype ingredientSubtype) {
		this.ingredientSubtype = ingredientSubtype;
	};
}
