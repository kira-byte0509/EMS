package com.example.birdi.controller;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;

import org.json.JSONObject;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.birdi.entity.Employee;
import com.example.birdi.repository.EmployeeRepository;

@RestController
@RequestMapping("/employees")
public class EmployeeController {
    private final EmployeeRepository employeesRepository;

    public EmployeeController(EmployeeRepository employeesRepository) {
        this.employeesRepository = employeesRepository;
    }
    @GetMapping
    public List<Employee> getEmployees() {
        return employeesRepository.findAll();
    }

    @GetMapping("/{id}")
    public Employee getEmployee(@PathVariable Long id) {
        return employeesRepository.findById(id).orElseThrow(RuntimeException::new);
    }

    @PutMapping
    public ResponseEntity createClient(@RequestBody Employee employee) throws URISyntaxException {
        Employee savedClient = employeesRepository.save(employee);
        return ResponseEntity.ok(savedClient);
    }

    @PostMapping("/{id}")
    public ResponseEntity updateClient(@PathVariable Long id, @RequestBody Employee employee) {
        Employee currentEmployee = employeesRepository.findById(id).orElseThrow(RuntimeException::new);
        
        currentEmployee = employeesRepository.save(employee);

        return ResponseEntity.ok(employee);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity deleteClient(@PathVariable Long id) {
        employeesRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}
