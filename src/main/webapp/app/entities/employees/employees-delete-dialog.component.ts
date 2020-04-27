import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IEmployees } from 'app/shared/model/employees.model';
import { EmployeesService } from './employees.service';

@Component({
  templateUrl: './employees-delete-dialog.component.html'
})
export class EmployeesDeleteDialogComponent {
  employees?: IEmployees;

  constructor(protected employeesService: EmployeesService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.employeesService.delete(id).subscribe(() => {
      this.eventManager.broadcast('employeesListModification');
      this.activeModal.close();
    });
  }
}
