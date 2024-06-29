package com.example.birdi.entity;

import java.util.Objects;

import org.apache.catalina.Manager;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Version;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class Employee {
    private @Id @GeneratedValue Long id;
	private String name;
	private String dob;
	private String mailId;
	private String mobileNumber;
	private String gender;
	private String position;
	private String managerName;
	private String role;

	public Employee(){}
	public Employee(String name, String dob, String gender,String position, String managerName,String mailId, String mobileNumber, String role) {
		this.name = name;
		this.dob = dob;
		this.gender = gender;
		this.position = position;
		this.managerName = managerName;
		this.mailId = mailId;
		this.mobileNumber = mobileNumber;
		this.role = role;
	}

    public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getDob() {
		return dob;
	}

	public void setDob(String dob) {
		this.dob = dob;
	}

	public String getGender() {
		return gender;
	}

	public void setGender(String gender) {
		this.gender = gender;
	}

	public String getPosition() {
		return position;
	}

	public void setPosition(String position) {
		this.position = position;
	}

	public String getManagerName() {
		return managerName;
	}

	public void setManagerName(String managerName) {
		this.managerName = managerName;
	}

	public String getMailId() {
		return mailId;
	}

	public void setMailId(String mailId) {
		this.mailId = mailId;
	}

	public String getMobileNumber() {
		return mobileNumber;
	}

	public void setMobileNumber(String mobileNumber) {
		this.mobileNumber = mobileNumber;
	}

	public String getRole() {
		return role;
	}

	public void setRole(String role) {
		this.role = role;
	}

    @Override
	public String toString() {
		return "Employee{" +
			"id=" + id +
			", name='" + name + '\'' +
			", dob='" + dob + '\'' +
			", gender='" + gender + '\''+
			", position='" + position + '\''+
			", managerName='" + managerName + '\''+
			", mailId='" + mailId + '\''+
			", mobileNumber='" + mobileNumber + '\''+
			", role='" + role + '\''+
			'}';
	}
}
