package com.example.birdi.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.birdi.entity.Employee;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Long>{
    @Override
	Employee save(@Param("employee") Employee employee);

	@Override
	void deleteById(@Param("id") Long id);

	@Override
	void delete(@Param("employee") Employee employee);
}
