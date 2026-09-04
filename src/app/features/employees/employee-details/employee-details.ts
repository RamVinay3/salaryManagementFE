import { Component, inject, signal } from '@angular/core';
import { DatePipe,DecimalPipe } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

import { Card } from '../../../shared/components/card/card';
import { Employee } from '../../../core/models/employee.model';
import { EmployeeService } from '../../../core/services/employee';
import { Salary } from '../../../core/models/salary.model';
import { SalaryService } from '../../../core/services/salary';
@Component({
  selector: 'app-employee-details',
  standalone: true,
  imports: [
    Card,
    RouterLink,
    DatePipe,
    DecimalPipe
  ],
  templateUrl: './employee-details.html',
  styleUrl: './employee-details.css'
})
export class EmployeeDetails {

  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  private readonly employeeService =
    inject(EmployeeService);

  private readonly salaryService =
    inject(SalaryService);

  readonly employee =
    signal<Employee | undefined>(undefined);

  readonly salary =
    signal<Salary | undefined>(undefined);

  readonly loading =
    signal(true);

  readonly loadingSalary =
    signal(false);

  readonly error =
    signal('');

  readonly salaryError =
    signal('');

  constructor() {
    const id = Number(
      this.route.snapshot.paramMap.get('id')
    );

    if (!id) {
      this.loading.set(false);
      this.error.set('Invalid employee ID.');
      return;
    }

    this.loadEmployee(id);
    this.loadSalary(id);
  }

  loadEmployee(id: number): void {
    this.loading.set(true);
    this.error.set('');

    this.employeeService.getEmployee(id).subscribe({
      next: employee => {
        this.employee.set(employee);
        this.loading.set(false);
      },

      error: error => {
        console.error(
          'Failed to load employee',
          error
        );

        this.employee.set(undefined);

        this.error.set(
          'Unable to load employee information.'
        );

        this.loading.set(false);
      }
    });
  }

  loadSalary(employeeId: number): void {
    this.loadingSalary.set(true);
    this.salaryError.set('');

    this.salaryService
      .getCurrentSalary(employeeId)
      .subscribe({
        next: salary => {
          this.salary.set(salary);
          this.loadingSalary.set(false);
        },

        error: error => {
          console.error(
            'Failed to load salary',
            error
          );

          this.salary.set(undefined);

          this.salaryError.set(
            'Unable to load salary information.'
          );

          this.loadingSalary.set(false);
        }
      });
  }

  getInitials(
    firstName: string,
    lastName: string
  ): string {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`
      .toUpperCase();
  }

  goBack(): void {
    this.router.navigate(['/employees']);
  }
}