import { Component, computed, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

import { Card } from '../../../shared/components/card/card';
import { Employee } from '../../../core/models/employee.model';
import { EMPLOYEES } from '../../../core/data/employee.data';

@Component({
  selector: 'app-employee-details',
  standalone: true,
  imports: [Card, RouterLink],
  templateUrl: './employee-details.html',
  styleUrl: './employee-details.css'
})
export class EmployeeDetails {

  private readonly route = inject(ActivatedRoute);

  private readonly router = inject(Router);

  readonly employee = computed<Employee | undefined>(() => {

    const id =
      this.route.snapshot.paramMap.get('id');

    return EMPLOYEES.find(
      employee => employee.id === id
    );
  });

  formatSalary(salary: number): string {
    return `₹${(salary / 100000).toFixed(2)}L`;
  }

  getInitials(name: string): string {
    return name
      .split(' ')
      .map(part => part.charAt(0))
      .slice(0, 2)
      .join('');
  }

  goBack(): void {
    this.router.navigate(['/employees']);
  }
}