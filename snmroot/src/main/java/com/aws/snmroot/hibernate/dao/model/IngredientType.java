package com.aws.snmroot.hibernate.dao.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "ingredient_type")
public class IngredientType {
/*table ingredient_type(ingredient_type_id mediumint not null auto_increment primary key,
	ingredient_type_desc varchar(50));
*/	
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	@Column(name = "ingredient_type_id")
	private Integer id;
	
	@Column(name = "ingredient_type_desc")
	private String ingredient_type_desc;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getIngredient_type_desc() {
		return ingredient_type_desc;
	}

	public void setIngredient_type_desc(String ingredient_type_desc) {
		this.ingredient_type_desc = ingredient_type_desc;
	}
	
	
}
