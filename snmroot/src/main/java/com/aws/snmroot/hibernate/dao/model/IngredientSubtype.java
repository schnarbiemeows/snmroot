package com.aws.snmroot.hibernate.dao.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "ingredient_subtype")
public class IngredientSubtype {
/*table ingredient_subtype(ingredient_subtype_id mediumint not null auto_increment primary key,
	ingredient_subtype_desc varchar(50));
*/	
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	@Column(name = "ingredient_subtype_id")
	private Integer id;
	
	@Column(name = "ingredient_subtype_desc")
	private String ingredient_subtype_desc;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getIngredient_subtype_desc() {
		return ingredient_subtype_desc;
	}

	public void setIngredient_subtype_desc(String ingredient_subtype_desc) {
		this.ingredient_subtype_desc = ingredient_subtype_desc;
	}
	
	
}
