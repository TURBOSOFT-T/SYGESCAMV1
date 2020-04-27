package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.domain.Employees;
import com.mycompany.myapp.repository.EmployeesRepository;
import com.mycompany.myapp.repository.search.EmployeesSearchRepository;
import com.mycompany.myapp.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * REST controller for managing {@link com.mycompany.myapp.domain.Employees}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class EmployeesResource {

    private final Logger log = LoggerFactory.getLogger(EmployeesResource.class);

    private static final String ENTITY_NAME = "employees";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final EmployeesRepository employeesRepository;

    private final EmployeesSearchRepository employeesSearchRepository;

    public EmployeesResource(EmployeesRepository employeesRepository, EmployeesSearchRepository employeesSearchRepository) {
        this.employeesRepository = employeesRepository;
        this.employeesSearchRepository = employeesSearchRepository;
    }

    /**
     * {@code POST  /employees} : Create a new employees.
     *
     * @param employees the employees to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new employees, or with status {@code 400 (Bad Request)} if the employees has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/employees")
    public ResponseEntity<Employees> createEmployees(@RequestBody Employees employees) throws URISyntaxException {
        log.debug("REST request to save Employees : {}", employees);
        if (employees.getId() != null) {
            throw new BadRequestAlertException("A new employees cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Employees result = employeesRepository.save(employees);
        employeesSearchRepository.save(result);
        return ResponseEntity.created(new URI("/api/employees/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /employees} : Updates an existing employees.
     *
     * @param employees the employees to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated employees,
     * or with status {@code 400 (Bad Request)} if the employees is not valid,
     * or with status {@code 500 (Internal Server Error)} if the employees couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/employees")
    public ResponseEntity<Employees> updateEmployees(@RequestBody Employees employees) throws URISyntaxException {
        log.debug("REST request to update Employees : {}", employees);
        if (employees.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Employees result = employeesRepository.save(employees);
        employeesSearchRepository.save(result);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, employees.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /employees} : get all the employees.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of employees in body.
     */
    @GetMapping("/employees")
    public List<Employees> getAllEmployees() {
        log.debug("REST request to get all Employees");
        return employeesRepository.findAll();
    }

    /**
     * {@code GET  /employees/:id} : get the "id" employees.
     *
     * @param id the id of the employees to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the employees, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/employees/{id}")
    public ResponseEntity<Employees> getEmployees(@PathVariable Long id) {
        log.debug("REST request to get Employees : {}", id);
        Optional<Employees> employees = employeesRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(employees);
    }

    /**
     * {@code DELETE  /employees/:id} : delete the "id" employees.
     *
     * @param id the id of the employees to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/employees/{id}")
    public ResponseEntity<Void> deleteEmployees(@PathVariable Long id) {
        log.debug("REST request to delete Employees : {}", id);
        employeesRepository.deleteById(id);
        employeesSearchRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }

    /**
     * {@code SEARCH  /_search/employees?query=:query} : search for the employees corresponding
     * to the query.
     *
     * @param query the query of the employees search.
     * @return the result of the search.
     */
    @GetMapping("/_search/employees")
    public List<Employees> searchEmployees(@RequestParam String query) {
        log.debug("REST request to search Employees for query {}", query);
        return StreamSupport
            .stream(employeesSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .collect(Collectors.toList());
    }
}
