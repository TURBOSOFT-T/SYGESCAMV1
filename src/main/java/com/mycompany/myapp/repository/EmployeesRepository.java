package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.Employees;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Employees entity.
 */
@SuppressWarnings("unused")
@Repository
public interface EmployeesRepository extends JpaRepository<Employees, Long> {
}
