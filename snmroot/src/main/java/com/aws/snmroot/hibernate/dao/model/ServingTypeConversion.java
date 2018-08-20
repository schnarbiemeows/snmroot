package com.aws.snmroot.hibernate.dao.model;

import java.math.BigDecimal;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "serving_type_conversion")
public class ServingTypeConversion {
/*table serving_type_conversion(serving_type_conversion_id mediumint not null auto_increment primary key,
	from_type_id mediumint not null, foreign key serving_type_fk_1(from_type_id) references serving_type(serving_type_id) on update cascade on delete cascade,
	to_type_id mediumint not null, foreign key serving_type_fk_2(to_type_id) references serving_type(serving_type_id) on update cascade on delete cascade,
	ratio decimal(5,2) not null);*/
	
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	@Column(name = "serving_type_conversion_id")
	private Integer id;
	
	@Column(name = "from_type_id")
	private Integer from_type_id;
	
	@Column(name = "to_type_id")
	private Integer to_type_id;
	
	@Column(name = "ratio")
	private BigDecimal ratio;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public Integer getFrom_type_id() {
		return from_type_id;
	}

	public void setFrom_type_id(Integer from_type_id) {
		this.from_type_id = from_type_id;
	}

	public Integer getTo_type_id() {
		return to_type_id;
	}

	public void setTo_type_id(Integer to_type_id) {
		this.to_type_id = to_type_id;
	}

	public BigDecimal getRatio() {
		return ratio;
	}

	public void setRatio(BigDecimal ratio) {
		this.ratio = ratio;
	}

}
