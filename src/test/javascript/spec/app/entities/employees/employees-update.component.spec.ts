import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { Sygescamv1TestModule } from '../../../test.module';
import { EmployeesUpdateComponent } from 'app/entities/employees/employees-update.component';
import { EmployeesService } from 'app/entities/employees/employees.service';
import { Employees } from 'app/shared/model/employees.model';

describe('Component Tests', () => {
  describe('Employees Management Update Component', () => {
    let comp: EmployeesUpdateComponent;
    let fixture: ComponentFixture<EmployeesUpdateComponent>;
    let service: EmployeesService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [Sygescamv1TestModule],
        declarations: [EmployeesUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(EmployeesUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(EmployeesUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(EmployeesService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Employees(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new Employees();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
