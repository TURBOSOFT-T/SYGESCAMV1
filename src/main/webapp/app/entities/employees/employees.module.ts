import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Sygescamv1SharedModule } from 'app/shared/shared.module';
import { EmployeesComponent } from './employees.component';
import { EmployeesDetailComponent } from './employees-detail.component';
import { EmployeesUpdateComponent } from './employees-update.component';
import { EmployeesDeleteDialogComponent } from './employees-delete-dialog.component';
import { employeesRoute } from './employees.route';

@NgModule({
  imports: [Sygescamv1SharedModule, RouterModule.forChild(employeesRoute)],
  declarations: [EmployeesComponent, EmployeesDetailComponent, EmployeesUpdateComponent, EmployeesDeleteDialogComponent],
  entryComponents: [EmployeesDeleteDialogComponent]
})
export class Sygescamv1EmployeesModule {}
