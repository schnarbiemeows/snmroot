package com.aws.snmroot.hibernate.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.aws.snmroot.hibernate.dao.model.ServingType;

public interface ServingTypeRepository extends JpaRepository<ServingType, Integer> {

}
