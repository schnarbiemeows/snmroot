package com.aws.snmroot.controller.forms;

import com.aws.snmroot.hibernate.dao.model.Account;
import com.aws.snmroot.hibernate.dao.model.BrandName;

public class BrandNameInputWrapper {

	private Account account;
	private BrandName brandName;
	public Account getAccount() {
		return account;
	}
	public void setAccount(Account account) {
		this.account = account;
	}
	public BrandName getBrandName() {
		return brandName;
	}
	public void setBrandName(BrandName brandName) {
		this.brandName = brandName;
	}
}
