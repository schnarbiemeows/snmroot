package com.aws.snmroot.hibernate.dao.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "brand_name")
public class BrandName {
/*table brand_name(brand_name_id mediumint not null auto_increment primary key,
	brand_name_desc varchar(50));
*/	
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	@Column(name = "brand_name_id")
	private Integer id;
	
	@Column(name = "brand_name_desc")
	private String brand_name_desc;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getBrand_name_desc() {
		return brand_name_desc;
	}

	public void setBrand_name_desc(String brand_name_desc) {
		this.brand_name_desc = brand_name_desc;
	}
}
