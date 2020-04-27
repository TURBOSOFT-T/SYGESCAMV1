package com.mycompany.myapp.repository.search;

import com.mycompany.myapp.domain.Employees;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the {@link Employees} entity.
 */
public interface EmployeesSearchRepository extends ElasticsearchRepository<Employees, Long> {
}
