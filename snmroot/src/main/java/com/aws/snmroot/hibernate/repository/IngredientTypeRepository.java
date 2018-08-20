package com.aws.snmroot.hibernate.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.aws.snmroot.hibernate.dao.model.IngredientType;

public interface IngredientTypeRepository extends JpaRepository<IngredientType, Integer> {

}
