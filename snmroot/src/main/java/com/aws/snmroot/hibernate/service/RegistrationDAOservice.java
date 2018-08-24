package com.aws.snmroot.hibernate.service;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;

import org.springframework.stereotype.Repository;

import com.aws.snmroot.hibernate.dao.model.Account;

@Repository
@Transactional
public class RegistrationDAOservice {

	@PersistenceContext
	private EntityManager entityManager;
	
	public Integer insert(Account record) {
		entityManager.persist(record);
		return record.getId();
	}
}
