package com.aws.snmroot.hibernate.dao.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "serving_type")
public class ServingType {
/*table serving_type(serving_type_id mediumint not null auto_increment primary key,
serving_type_desc varchar(50)
*/	
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	@Column(name = "serving_type_id")
	private Integer id;
	
	@Column(name = "serving_type_desc")
	private String serving_type_desc;
	
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public String getServingtype_desc() {
		return serving_type_desc;
	}
	public void setServingtype_desc(String serving_type_desc) {
		this.serving_type_desc = serving_type_desc;
	}
}
