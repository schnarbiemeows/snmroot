package com.aws.snmroot.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
public class LoginException extends RuntimeException {

	private static final long serialVersionUID = 1L;

	public LoginException(String message) {
		super(message);
		// TODO Auto-generated constructor stub
	}
}
