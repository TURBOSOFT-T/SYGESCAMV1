import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IEmployees } from 'app/shared/model/employees.model';
import { EmployeesService } from './employees.service';
import { EmployeesDeleteDialogComponent } from './employees-delete-dialog.component';

@Component({
  selector: 'jhi-employees',
  templateUrl: './employees.component.html'
})
export class EmployeesComponent implements OnInit, OnDestroy {
  employees?: IEmployees[];
  eventSubscriber?: Subscription;
  currentSearch: string;

  constructor(
    protected employeesService: EmployeesService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal,
    protected activatedRoute: ActivatedRoute
  ) {
    this.currentSearch =
      this.activatedRoute.snapshot && this.activatedRoute.snapshot.queryParams['search']
        ? this.activatedRoute.snapshot.queryParams['search']
        : '';
  }

  loadAll(): void {
    if (this.currentSearch) {
      this.employeesService
        .search({
          query: this.currentSearch
        })
        .subscribe((res: HttpResponse<IEmployees[]>) => (this.employees = res.body || []));
      return;
    }

    this.employeesService.query().subscribe((res: HttpResponse<IEmployees[]>) => (this.employees = res.body || []));
  }

  search(query: string): void {
    this.currentSearch = query;
    this.loadAll();
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInEmployees();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IEmployees): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInEmployees(): void {
    this.eventSubscriber = this.eventManager.subscribe('employeesListModification', () => this.loadAll());
  }

  delete(employees: IEmployees): void {
    const modalRef = this.modalService.open(EmployeesDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.employees = employees;
  }
}
