import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IEmployees, Employees } from 'app/shared/model/employees.model';
import { EmployeesService } from './employees.service';

@Component({
  selector: 'jhi-employees-update',
  templateUrl: './employees-update.component.html'
})
export class EmployeesUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    firstName: [],
    lastName: [],
    email: [],
    phoneNumber: []
  });

  constructor(protected employeesService: EmployeesService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ employees }) => {
      this.updateForm(employees);
    });
  }

  updateForm(employees: IEmployees): void {
    this.editForm.patchValue({
      id: employees.id,
      firstName: employees.firstName,
      lastName: employees.lastName,
      email: employees.email,
      phoneNumber: employees.phoneNumber
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const employees = this.createFromForm();
    if (employees.id !== undefined) {
      this.subscribeToSaveResponse(this.employeesService.update(employees));
    } else {
      this.subscribeToSaveResponse(this.employeesService.create(employees));
    }
  }

  private createFromForm(): IEmployees {
    return {
      ...new Employees(),
      id: this.editForm.get(['id'])!.value,
      firstName: this.editForm.get(['firstName'])!.value,
      lastName: this.editForm.get(['lastName'])!.value,
      email: this.editForm.get(['email'])!.value,
      phoneNumber: this.editForm.get(['phoneNumber'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IEmployees>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }
}
