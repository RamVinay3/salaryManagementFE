import { Component, computed, inject, signal } from '@angular/core';
import { DecimalPipe } from '@angular/common';

import { Card } from '../../shared/components/card/card';
import { Employee } from '../../core/models/employee.model';
import { Statistics } from '../../core/models/statistics.model';
import { StatisticsService } from '../../core/services/statistics';
import { EmployeeService } from '../../core/services/employee';
import { SalaryService } from '../../core/services/salary';
import { RecentEmployee } from '../../core/models/recent-employee.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    Card,
    DecimalPipe,
    RouterLink
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard {

  private readonly statisticsService = inject(StatisticsService);

  readonly statistics = signal<Statistics | undefined>(undefined);
  readonly loading = signal(true);
  readonly error = signal('');

readonly recentEmployees = signal<RecentEmployee[]>([]);
readonly loadingRecentEmployees = signal(false);
readonly employeeService = inject(EmployeeService);
private readonly salaryService = inject(SalaryService);

  readonly stats = computed(() => {
  const statistics = this.statistics();

  if (!statistics) {
    return [];
  }

  const averageSalary =
    statistics.averageSalaryByCurrency.length > 0
      ? statistics.averageSalaryByCurrency[0]
      : undefined;

  return [
    {
      title: 'Total Employees',
      value: statistics.totalEmployees.toLocaleString('en-IN'),
      change: 'Current',
      changeType: 'positive',
      icon: '👥'
    },
    {
      title: 'Average Salary',
      value: averageSalary
        ? `${this.formatSalary(
            averageSalary.averageSalary,averageSalary.currency
          )} `
        : '—',
      change: 'Current',
      changeType: 'positive',
      icon: '💰'
    },
    {
      title: 'Highest Salary',
      value: '—',
      change: 'Not available',
      changeType: 'positive',
      icon: '📈'
    },
    {
      title: 'Departments',
      value: statistics.employeesByDepartment.length.toString(),
      change: 'Current',
      changeType: 'positive',
      icon: '🏢'
    }
  ];
});

  constructor() {
    this.loadStatistics();
     this.loadRecentEmployees();
  }
  loadRecentEmployees(): void {
  this.loadingRecentEmployees.set(true);

  this.employeeService.getEmployees(0, 5).subscribe({
    next: response => {

      const employees = response.content;

      if (employees.length === 0) {
        this.recentEmployees.set([]);
        this.loadingRecentEmployees.set(false);
        return;
      }

      let completed = 0;

     const recentEmployees: RecentEmployee[] =
                                              employees.map(employee => ({
                                                id: employee.id,
                                                employeeCode: employee.employeeCode,
                                                firstName: employee.firstName,
                                                lastName: employee.lastName,
                                                department: employee.departmentName,
                                                salary: null,
                                                currency: null,
                                                status: 'Active'
                                              }));

      employees.forEach((employee, index) => {

        this.salaryService.getCurrentSalary(employee.id).subscribe({
          next: salary => {

            recentEmployees[index] = {
              ...recentEmployees[index],
              salary: salary.amount,
              currency: salary.currency
            };

            completed++;

            if (completed === employees.length) {
              this.recentEmployees.set(recentEmployees);
              this.loadingRecentEmployees.set(false);
            }
          },

          error: error => {

            console.error(
              `Failed to load salary for employee ${employee.id}`,
              error
            );

            completed++;

            if (completed === employees.length) {
              this.recentEmployees.set(recentEmployees);
              this.loadingRecentEmployees.set(false);
            }
          }
        });

      });
    },

    error: error => {
      console.error(
        'Failed to load recent employees',
        error
      );

      this.recentEmployees.set([]);
      this.loadingRecentEmployees.set(false);
    }
  });
}

  loadStatistics(): void {
    this.loading.set(true);
    this.error.set('');

    this.statisticsService.getStatistics().subscribe({
      next: statistics => {
        this.statistics.set(statistics);
        this.loading.set(false);
      },

      error: error => {
        console.error(
          'Failed to load dashboard statistics',
          error
        );

        this.statistics.set(undefined);
        this.error.set(
          'Unable to load dashboard statistics.'
        );

        this.loading.set(false);
      }
    });
  }

  
  formatSalary(
  amount: number | null,
  currency: string | null
): string {
  if (amount === null || currency === null) {
    return '—';
  }

  return `${amount.toLocaleString('en-IN', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })} ${currency}`;
}
}