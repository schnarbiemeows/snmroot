package com.aws.snmroot.hibernate.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.aws.snmroot.hibernate.dao.model.BrandName;

public interface BrandNameRepository extends JpaRepository<BrandName, Integer> {

}
