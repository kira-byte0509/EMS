package com.example.birdi.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import com.example.birdi.entity.Employee;
import com.example.birdi.repository.EmployeeRepository;

@Component
public class DataLoader implements CommandLineRunner{
    
    private final EmployeeRepository repository;

    @Autowired
	public DataLoader(EmployeeRepository repository) {
		this.repository = repository;
	}

	@Override
	public void run(String... strings) throws Exception {
		this.repository.save(new Employee("Praneeth", "21-06-1997","Male","Senior Developer","Satish","praneeth@gmail.com","123456","Admin"));
		this.repository.save(new Employee("Vamshi", "04-12-1997","Male","Developer","Satish","vamshi@gmail.com","123456","Admin"));
		this.repository.save(new Employee("Vinay", "15-01-1995","Male","Tester","Satish","vinay@gmail.com","123456","Admin"));
		this.repository.save(new Employee("Vijay", "01-09-1980","Male","Project Manager","Satish","vijay@gmail.com","123456","Admin"));
		this.repository.save(new Employee("Pawan", "04-07-1982","Male","Team Lead","Satish","pawan@gmail.com","123456","Admin"));
	}
    
}
