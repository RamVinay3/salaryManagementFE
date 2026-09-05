import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import {
  Salary,
  SalaryUpdateRequest
} from '../models/salary.model';

@Injectable({
  providedIn: 'root'
})
export class SalaryService {

  private readonly http = inject(HttpClient);

  private readonly apiUrl =
    'http://localhost:8080/api/employees';

  getCurrentSalary(employeeId: number): Observable<Salary> {
    return this.http.get<Salary>(
      `${this.apiUrl}/${employeeId}/salary`
    );
  }

  createSalary(
    employeeId: number,
    salary: SalaryUpdateRequest
  ): Observable<Salary> {
    return this.http.post<Salary>(
      `${this.apiUrl}/${employeeId}/salary`,
      salary
    );
  }
  getSalaryHistory(employeeId: number): Observable<Salary[]> {
  return this.http.get<Salary[]>(
    `${this.apiUrl}/${employeeId}/salary/history`
  );
}
}