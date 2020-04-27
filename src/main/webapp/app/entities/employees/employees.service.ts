import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption, Search } from 'app/shared/util/request-util';
import { IEmployees } from 'app/shared/model/employees.model';

type EntityResponseType = HttpResponse<IEmployees>;
type EntityArrayResponseType = HttpResponse<IEmployees[]>;

@Injectable({ providedIn: 'root' })
export class EmployeesService {
  public resourceUrl = SERVER_API_URL + 'api/employees';
  public resourceSearchUrl = SERVER_API_URL + 'api/_search/employees';

  constructor(protected http: HttpClient) {}

  create(employees: IEmployees): Observable<EntityResponseType> {
    return this.http.post<IEmployees>(this.resourceUrl, employees, { observe: 'response' });
  }

  update(employees: IEmployees): Observable<EntityResponseType> {
    return this.http.put<IEmployees>(this.resourceUrl, employees, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IEmployees>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IEmployees[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: Search): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IEmployees[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }
}
