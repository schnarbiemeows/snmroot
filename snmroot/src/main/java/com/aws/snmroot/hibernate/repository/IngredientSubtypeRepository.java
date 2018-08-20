package com.aws.snmroot.hibernate.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.aws.snmroot.hibernate.dao.model.IngredientSubtype;

public interface IngredientSubtypeRepository extends JpaRepository<IngredientSubtype, Integer> {

}
