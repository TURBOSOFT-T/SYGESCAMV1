import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { Sygescamv1TestModule } from '../../../test.module';
import { EmployeesComponent } from 'app/entities/employees/employees.component';
import { EmployeesService } from 'app/entities/employees/employees.service';
import { Employees } from 'app/shared/model/employees.model';

describe('Component Tests', () => {
  describe('Employees Management Component', () => {
    let comp: EmployeesComponent;
    let fixture: ComponentFixture<EmployeesComponent>;
    let service: EmployeesService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [Sygescamv1TestModule],
        declarations: [EmployeesComponent]
      })
        .overrideTemplate(EmployeesComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(EmployeesComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(EmployeesService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Employees(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.employees && comp.employees[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
