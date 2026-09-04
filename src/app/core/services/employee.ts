import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Employee } from '../models/employee.model';
import { PageResponse } from '../models/page-response.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private readonly http = inject(HttpClient);

  private readonly apiUrl = 'http://localhost:8080/api/employees';

  getEmployees(
    page: number,
    size: number,
    search?: string,
    departmentId?: number,
    country?: string
  ): Observable<PageResponse<Employee>> {

    let params = new HttpParams()
      .set('page', page)
      .set('size', size);

    if (search) {
      params = params.set('search', search);
    }

    if (departmentId !== undefined) {
      params = params.set('departmentId', departmentId);
    }

    if (country) {
      params = params.set('country', country);
    }

    return this.http.get<PageResponse<Employee>>(
      this.apiUrl,
      { params }
    );
  }

  getEmployee(id: number): Observable<Employee> {
    return this.http.get<Employee>(
      `${this.apiUrl}/${id}`
    );
  }

  createEmployee(
    employee: CreateEmployeeRequest
  ): Observable<Employee> {
    return this.http.post<Employee>(
      this.apiUrl,
      employee
    );
  }

  updateEmployee(
    id: number,
    employee: UpdateEmployeeRequest
  ): Observable<Employee> {
    return this.http.put<Employee>(
      `${this.apiUrl}/${id}`,
      employee
    );
  }

  deleteEmployee(id: number): Observable<void> {
    return this.http.delete<void>(
      `${this.apiUrl}/${id}`
    );
  }
}

export interface CreateEmployeeRequest {
  employeeCode: string;
  firstName: string;
  lastName: string;
  email: string;
  country: string;
  departmentId: number;
  jobTitle: string;
  hireDate: string;
}

export interface UpdateEmployeeRequest {
  firstName: string;
  lastName: string;
  email: string;
  country: string;
  departmentId: number;
  jobTitle: string;
  hireDate: string;
}