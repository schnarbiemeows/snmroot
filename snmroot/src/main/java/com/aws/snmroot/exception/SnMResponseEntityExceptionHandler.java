package com.aws.snmroot.exception;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@ControllerAdvice
@RestController
public class SnMResponseEntityExceptionHandler extends ResponseEntityExceptionHandler {

	@ExceptionHandler(Exception.class)
	public final ResponseEntity<Object> handleAllExceptions(Exception ex, WebRequest request) {
		SnmExceptionResponse exceptionResponse = 
		new SnmExceptionResponse(new Date(),ex.getMessage(),request.getDescription(false));
		return new ResponseEntity(exceptionResponse, HttpStatus.INTERNAL_SERVER_ERROR);
	}
	
	@ExceptionHandler(NotFoundException.class)
	public final ResponseEntity<Object> handleUserNotFoundException(Exception ex, WebRequest request) {
		SnmExceptionResponse exceptionResponse = 
		new SnmExceptionResponse(new Date(),ex.getMessage(),request.getDescription(false));
		return new ResponseEntity(exceptionResponse, HttpStatus.NOT_FOUND);
	}
	
	@ExceptionHandler(DataIntegrityViolationException.class)
	public final ResponseEntity<Object> handleSQLException(Exception ex, WebRequest request) {
		SnmExceptionResponse exceptionResponse = 
		new SnmExceptionResponse(new Date(),ex.getMessage(),request.getDescription(false));
		return new ResponseEntity(exceptionResponse, HttpStatus.INTERNAL_SERVER_ERROR);
	}
	
	@ExceptionHandler(EmptyResultDataAccessException.class)
	public final ResponseEntity<Object> handleDeletedNotFoundException(Exception ex, WebRequest request) {
		SnmExceptionResponse exceptionResponse = 
		new SnmExceptionResponse(new Date(),ex.getMessage(),request.getDescription(false));
		return new ResponseEntity(exceptionResponse, HttpStatus.NOT_FOUND);
	}
	
	@ExceptionHandler(UnauthorizedException.class)
	public final ResponseEntity<Object> handleUnauthorizedException(Exception ex, WebRequest request) {
		SnmExceptionResponse exceptionResponse = 
		new SnmExceptionResponse(new Date(),ex.getMessage(),request.getDescription(false));
		return new ResponseEntity(exceptionResponse, HttpStatus.FORBIDDEN);
	}
	
	@ExceptionHandler(LoginException.class)
	public final ResponseEntity<Object> handleLoginRegistrationException(Exception ex, WebRequest request) {
		SnmExceptionResponse exceptionResponse = 
		new SnmExceptionResponse(new Date(),ex.getMessage(),request.getDescription(false));
		return new ResponseEntity(exceptionResponse, HttpStatus.INTERNAL_SERVER_ERROR);
	}
	
	@Override
	protected ResponseEntity<Object> handleMethodArgumentNotValid(MethodArgumentNotValidException ex,
			HttpHeaders headers, HttpStatus status, WebRequest request) {
			List<ObjectError> errors = ex.getBindingResult().getAllErrors();
			List<String> defaultErrors = new ArrayList();
			for(ObjectError error : errors) {
				defaultErrors.add(error.getDefaultMessage());
			}
			SnmExceptionResponse exceptionResponse = 
			new SnmExceptionResponse(new Date(), defaultErrors, "Validation failed");
			return new ResponseEntity(exceptionResponse, HttpStatus.BAD_REQUEST);
	}
}
