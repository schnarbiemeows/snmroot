package com.aws.snmroot.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.aws.snmroot.hibernate.dao.model.Item;
import com.aws.snmroot.hibernate.repository.ItemsRepository;

@Controller
@RequestMapping(path="/root")
public class MainController {

	@Autowired
	private ItemsRepository itemsRepository;
	
	@GetMapping(path="/addItem")
	public @ResponseBody String addNewItem(@RequestParam String itemValue) {
		Item item = new Item();
		item.setValue(itemValue);;
		itemsRepository.save(item);
		return "{ \"response\" : \"saved\" } ";
	}
	
	@GetMapping(path="/all")
	public @ResponseBody Iterable<Item> getAllItems() {
		return itemsRepository.findAll();
	}
	
	@GetMapping(path="/one")
	public @ResponseBody Optional<Item> getOneItem() {
		Integer id = new Integer(5);
		return itemsRepository.findById(id);
	}
	
	@GetMapping(path="/update")
	public @ResponseBody String updateItem() {
		Integer id = new Integer(5);
		Optional<Item> opItem = itemsRepository.findById(id);
		Item item = opItem.get();
		item.setValue("double woot!");
		itemsRepository.save(item);
		return "{ \"response\" : \"saved\" } ";
	}
}
