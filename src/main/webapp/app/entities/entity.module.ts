import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'employees',
        loadChildren: () => import('./employees/employees.module').then(m => m.Sygescamv1EmployeesModule)
      }
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ])
  ]
})
export class Sygescamv1EntityModule {}
