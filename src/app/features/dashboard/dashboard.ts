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

readonly selectedSalaryKey = signal('');
readonly selectedAverageCurrency = signal('');

readonly selectedAverageSalary = computed(() => {
  const salaries = this.statistics()?.averageSalaryByCurrency ?? [];
  const selectedCurrency = this.selectedAverageCurrency();

  if (salaries.length === 0) {
    return undefined;
  }

  if (!selectedCurrency) {
    return salaries[0];
  }

  return salaries.find(
    salary => salary.currency === selectedCurrency
  ) ?? salaries[0];
});

readonly selectedSalaryStatistic = computed(() => {
  const statistics = this.statistics()?.salaryStatisticsByCountry ?? [];
  const selectedKey = this.selectedSalaryKey();

  if (statistics.length === 0) {
    return undefined;
  }

  if (!selectedKey) {
    return statistics[0];
  }

  return statistics.find(
    statistic =>
      `${statistic.country}|${statistic.currency}` === selectedKey
  ) ?? statistics[0];
});

  readonly stats = computed(() => {
  const statistics = this.statistics();

  if (!statistics) {
    return [];
  }

  

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
    value: this.selectedAverageSalary()
      ? this.formatSalary(
          this.selectedAverageSalary()!.averageSalary,
          this.selectedAverageSalary()!.currency
        )
      : '—',
    change: this.selectedAverageSalary()
      ? this.selectedAverageSalary()!.currency
      : 'Not available',
    changeType: 'positive',
    icon: '💰'
  },
    {
      title: 'Highest Salary',
      value: this.selectedSalaryStatistic()
        ? this.formatSalary(
            this.selectedSalaryStatistic()!.maximumSalary,
            this.selectedSalaryStatistic()!.currency
          )
        : '—',
      change: this.selectedSalaryStatistic()
        ? `${this.selectedSalaryStatistic()!.country} · ${this.selectedSalaryStatistic()!.currency}`
        : 'Not available',
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
selectSalaryStatistic(event: Event): void {
  const select = event.target as HTMLSelectElement;
  this.selectedSalaryKey.set(select.value);
}
selectAverageSalary(event: Event): void {
  const select = event.target as HTMLSelectElement;
  this.selectedAverageCurrency.set(select.value);
}
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