package com.aws.snmroot.controller.forms;

public class DeleteMessage {

	private String message;

	private String loginToken;
	
	private String adminToken;
	
	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public String getLoginToken() {
		return loginToken;
	}

	public void setLoginToken(String loginToken) {
		this.loginToken = loginToken;
	}

	public String getAdminToken() {
		return adminToken;
	}

	public void setAdminToken(String adminToken) {
		this.adminToken = adminToken;
	}

	public DeleteMessage(String message, String loginToken, String adminToken) {
		super();
		this.message = message;
		this.loginToken = loginToken;
		this.adminToken = adminToken;
	}

	
}
