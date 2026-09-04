import { Component, computed, inject, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';

import { Card } from '../../shared/components/card/card';
import { Employee } from '../../core/models/employee.model';
import { Department } from '../../core/models/department.model';
import { EmployeeService } from '../../core/services/employee';
import { DepartmentService } from '../../core/services/department';

@Component({
  selector: 'app-employees',
  standalone: true,
  imports: [
    Card,
    RouterLink,
    DatePipe
  ],
  templateUrl: './employees.html',
  styleUrl: './employees.css'
})
export class Employees {

  private readonly employeeService =
    inject(EmployeeService);

  private readonly departmentService =
    inject(DepartmentService);

  readonly searchTerm = signal('');

  readonly selectedDepartment =
    signal<number | ''>('');

  readonly selectedCountry = signal('');

  readonly currentPage = signal(0);

  readonly pageSize = signal(10);

  readonly employees =
    signal<Employee[]>([]);

  readonly departments =
    signal<Department[]>([]);

  readonly totalElements = signal(0);

  readonly totalPages = signal(0);

  readonly loading = signal(false);

  readonly loadingDepartments =
    signal(false);

  readonly error = signal('');

  readonly departmentError =
    signal('');

  readonly startRecord = computed(() => {

    if (this.totalElements() === 0) {
      return 0;
    }

    return (
      this.currentPage() *
      this.pageSize()
    ) + 1;
  });

  readonly endRecord = computed(() => {

    return Math.min(
      (this.currentPage() + 1) *
        this.pageSize(),
      this.totalElements()
    );
  });

  readonly visiblePages =
    computed<(number | -1)[]>(() => {

      const totalPages =
        this.totalPages();

      const currentPage =
        this.currentPage();

      if (totalPages <= 7) {
        return Array.from(
          { length: totalPages },
          (_, index) => index
        );
      }

      const pages: (number | -1)[] = [];

      pages.push(0);

      if (currentPage <= 3) {

        pages.push(
          1,
          2,
          3,
          4,
          5
        );

        pages.push(-1);

        pages.push(
          totalPages - 1
        );

        return pages;
      }

      if (currentPage >= totalPages - 4) {

        pages.push(-1);

        pages.push(
          totalPages - 6,
          totalPages - 5,
          totalPages - 4,
          totalPages - 3,
          totalPages - 2
        );

        pages.push(
          totalPages - 1
        );

        return pages;
      }

      pages.push(-1);

      pages.push(
        currentPage - 1,
        currentPage,
        currentPage + 1
      );

      pages.push(-1);

      pages.push(
        totalPages - 1
      );

      return pages;
    });

  constructor() {
    this.loadDepartments();
    this.loadEmployees();
  }

  loadDepartments(): void {

    this.loadingDepartments.set(true);
    this.departmentError.set('');

    this.departmentService
      .getDepartments()
      .subscribe({

        next: departments => {

          this.departments.set(
            departments
          );

          this.loadingDepartments.set(false);
        },

        error: error => {

          console.error(
            'Failed to load departments',
            error
          );

          this.departments.set([]);

          this.departmentError.set(
            'Unable to load departments.'
          );

          this.loadingDepartments.set(false);
        }
      });
  }

  loadEmployees(): void {

    this.loading.set(true);
    this.error.set('');

    const departmentId =
      this.selectedDepartment();

    this.employeeService.getEmployees(
      this.currentPage(),
      this.pageSize(),
      this.searchTerm(),
      departmentId === ''
        ? undefined
        : departmentId,
      this.selectedCountry()
    ).subscribe({

      next: response => {

        this.employees.set(
          response.content
        );

        this.totalElements.set(
          response.totalElements
        );

        this.totalPages.set(
          response.totalPages
        );

        this.loading.set(false);
      },

      error: error => {

        console.error(
          'Failed to load employees',
          error
        );

        this.employees.set([]);

        this.totalElements.set(0);

        this.totalPages.set(0);

        this.error.set(
          'Unable to load employees. Please try again.'
        );

        this.loading.set(false);
      }
    });
  }

  onSearch(): void {

    this.currentPage.set(0);

    this.loadEmployees();
  }

  onDepartmentChange(
    event: Event
  ): void {

    const value =
      (event.target as HTMLSelectElement)
        .value;

    this.selectedDepartment.set(
      value === ''
        ? ''
        : Number(value)
    );

    this.currentPage.set(0);

    this.loadEmployees();
  }

  onCountryChange(
    event: Event
  ): void {

    const value =
      (event.target as HTMLSelectElement)
        .value;

    this.selectedCountry.set(value);

    this.currentPage.set(0);

    this.loadEmployees();
  }

  clearFilters(): void {

    this.searchTerm.set('');

    this.selectedDepartment.set('');

    this.selectedCountry.set('');

    this.currentPage.set(0);

    this.loadEmployees();
  }

  goToPage(page: number): void {

    if (
      page < 0 ||
      page >= this.totalPages() ||
      page === this.currentPage()
    ) {
      return;
    }

    this.currentPage.set(page);

    this.loadEmployees();
  }

  goToPreviousPage(): void {

    if (this.currentPage() > 0) {

      this.currentPage.update(
        page => page - 1
      );

      this.loadEmployees();
    }
  }

  goToNextPage(): void {

    if (
      this.currentPage() <
      this.totalPages() - 1
    ) {

      this.currentPage.update(
        page => page + 1
      );

      this.loadEmployees();
    }
  }

  getInitials(
    firstName: string,
    lastName: string
  ): string {

    return `${firstName.charAt(0)}${lastName.charAt(0)}`
      .toUpperCase();
  }
}