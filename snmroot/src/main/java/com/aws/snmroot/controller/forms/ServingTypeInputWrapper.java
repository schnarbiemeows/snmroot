package com.aws.snmroot.controller.forms;

import com.aws.snmroot.hibernate.dao.model.Account;
import com.aws.snmroot.hibernate.dao.model.ServingType;

public class ServingTypeInputWrapper {

	private Account account;
	private ServingType servingType;
	public Account getAccount() {
		return account;
	}
	public void setAccount(Account account) {
		this.account = account;
	}
	public ServingType getServingType() {
		return servingType;
	}
	public void setServingType(ServingType servingType) {
		this.servingType = servingType;
	}
}
