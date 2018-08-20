package com.aws.snmroot.hibernate.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.aws.snmroot.hibernate.dao.model.Item;

public interface ItemsRepository extends JpaRepository<Item, Integer> {

}
