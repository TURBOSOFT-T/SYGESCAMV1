import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IEmployees, Employees } from 'app/shared/model/employees.model';
import { EmployeesService } from './employees.service';
import { EmployeesComponent } from './employees.component';
import { EmployeesDetailComponent } from './employees-detail.component';
import { EmployeesUpdateComponent } from './employees-update.component';

@Injectable({ providedIn: 'root' })
export class EmployeesResolve implements Resolve<IEmployees> {
  constructor(private service: EmployeesService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IEmployees> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((employees: HttpResponse<Employees>) => {
          if (employees.body) {
            return of(employees.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Employees());
  }
}

export const employeesRoute: Routes = [
  {
    path: '',
    component: EmployeesComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'sygescamv1App.employees.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: EmployeesDetailComponent,
    resolve: {
      employees: EmployeesResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'sygescamv1App.employees.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: EmployeesUpdateComponent,
    resolve: {
      employees: EmployeesResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'sygescamv1App.employees.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: EmployeesUpdateComponent,
    resolve: {
      employees: EmployeesResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'sygescamv1App.employees.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
