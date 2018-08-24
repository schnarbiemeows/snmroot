package com.aws.snmroot.controller.forms;

public class DeleteMessage {

	private String message;

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public DeleteMessage(String message) {
		super();
		this.message = message;
	}
}
