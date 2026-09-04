import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Department } from '../models/department.model';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  private readonly http = inject(HttpClient);

  private readonly apiUrl =
    'http://localhost:8080/api/departments';

  getDepartments(): Observable<Department[]> {
    return this.http.get<Department[]>(
      this.apiUrl
    );
  }

  getDepartment(id: number): Observable<Department> {
    return this.http.get<Department>(
      `${this.apiUrl}/${id}`
    );
  }
}