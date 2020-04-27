import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IEmployees } from 'app/shared/model/employees.model';

@Component({
  selector: 'jhi-employees-detail',
  templateUrl: './employees-detail.component.html'
})
export class EmployeesDetailComponent implements OnInit {
  employees: IEmployees | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ employees }) => (this.employees = employees));
  }

  previousState(): void {
    window.history.back();
  }
}
