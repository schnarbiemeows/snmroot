package com.aws.snmroot.hibernate.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.aws.snmroot.hibernate.dao.model.Account;

public interface AccountRepository extends JpaRepository<Account, Integer> {

	 @Query("select s from Account s where s.username = ?1")
	 List<Account> findByUserName(String username);
	 
	 @Query("select s from Account s where s.token = ?1")
	 List<Account> findByLoginToken(String username);
}
