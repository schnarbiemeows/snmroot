package com.aws.snmroot.exception;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class SnmExceptionResponse {

	private Date timestamp;
	private List<String> message = new ArrayList();
	private String details;
	public SnmExceptionResponse(Date timestamp, String message, String details) {
		super();
		this.timestamp = timestamp;
		this.message.add(message);
		this.details = details;
	}
	
	public SnmExceptionResponse(Date timestamp, List<String> messages, String details) {
		super();
		this.timestamp = timestamp;
		this.message = messages;
		this.details = details;
	}
	public Date getTimestamp() {
		return timestamp;
	}
	public void setTimestamp(Date timestamp) {
		this.timestamp = timestamp;
	}
	
	public List<String> getMessage() {
		return message;
	}
	public void setMessage(List<String> message) {
		this.message = message;
	}
	public String getDetails() {
		return details;
	}
	public void setDetails(String details) {
		this.details = details;
	}
}
