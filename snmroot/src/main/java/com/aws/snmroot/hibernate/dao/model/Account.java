package com.aws.snmroot.hibernate.dao.model;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.Email;
import javax.validation.constraints.Size;

import org.hibernate.validator.constraints.UniqueElements;

@Entity
@Table(name = "accounts")
public class Account {
// TODO - rename object to Account
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	@Column(name = "account_id")
	private Integer id;
	
	@Size(min=2, message="name should have at least 2 characters")
	@Column(name = "username")
	private String username;
	
	@Size(min=2,  message="password should be at least 2 characters")
	@Column(name = "password")
	private String password;
	
	@Email(message="email address in not correctly formatted")
	@Column(name = "email")
	private String email;
	
	@Column(name = "admin")
	private String admin = "N";
	
	@Column(name = "validated")
	private String validated = "N";
	
	@Column(name = "token")
	private String token;
	
	@Column(name = "admintoken")
	private String admintoken;
	
	@Column(name = "subscribertoken")
	private String subscribertoken;
	
	public String getValidated() {
		return validated;
	}
	public void setValidated(String validated) {
		this.validated = validated;
	}
	public String getAdmintoken() {
		return admintoken;
	}
	public void setAdmintoken(String admintoken) {
		this.admintoken = admintoken;
	}
	public String getSubscribertoken() {
		return subscribertoken;
	}
	public void setSubscribertoken(String subscribertoken) {
		this.subscribertoken = subscribertoken;
	}
	@Column(name = "created_date")
	private Date created_date;
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	
	public String getAdmin() {
		return admin;
	}
	public void setAdmin(String admin) {
		this.admin = admin;
	}
	public String getToken() {
		return token;
	}
	public void setToken(String token) {
		this.token = token;
	}
	public Date getCreated_date() {
		return created_date;
	}
	public void setCreated_date(Date created_date) {
		this.created_date = created_date;
	}
}
