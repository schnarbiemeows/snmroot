package com.aws.snmroot.hibernate.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.aws.snmroot.hibernate.dao.model.Registration;

public interface RegistrationRepository extends JpaRepository<Registration, Integer> {

	 @Query("select s from Registration s where s.username = ?1")
	 List<Registration> findByUserName(String username);
}
