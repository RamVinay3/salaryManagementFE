import { Component, computed, signal } from '@angular/core';
import { Card } from '../../shared/components/card/card';
import { Employee } from '../../core/models/employee.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-employees',
  standalone: true,
  imports: [Card,RouterLink],
  templateUrl: './employees.html',
  styleUrl: './employees.css'
})
export class Employees {

  readonly employees = signal<Employee[]>([
    {
      id: 'EMP001',
      name: 'Amit Sharma',
      email: 'amit.sharma@company.com',
      department: 'Engineering',
      designation: 'Senior Software Engineer',
      salary: 1250000,
      status: 'Active'
    },
    {
      id: 'EMP002',
      name: 'Priya Reddy',
      email: 'priya.reddy@company.com',
      department: 'Product',
      designation: 'Product Manager',
      salary: 1870000,
      status: 'Active'
    },
    {
      id: 'EMP003',
      name: 'Rahul Kumar',
      email: 'rahul.kumar@company.com',
      department: 'Sales',
      designation: 'Sales Manager',
      salary: 1560000,
      status: 'Active'
    },
    {
      id: 'EMP004',
      name: 'Sneha Patel',
      email: 'sneha.patel@company.com',
      department: 'Engineering',
      designation: 'Software Engineer',
      salary: 1120000,
      status: 'Active'
    },
    {
      id: 'EMP005',
      name: 'Arjun Mehta',
      email: 'arjun.mehta@company.com',
      department: 'Finance',
      designation: 'Financial Analyst',
      salary: 980000,
      status: 'Inactive'
    },
    {
      id: 'EMP006',
      name: 'Neha Singh',
      email: 'neha.singh@company.com',
      department: 'HR',
      designation: 'HR Manager',
      salary: 1350000,
      status: 'Active'
    },
    {
      id: 'EMP007',
      name: 'Vikram Rao',
      email: 'vikram.rao@company.com',
      department: 'Engineering',
      designation: 'Tech Lead',
      salary: 2250000,
      status: 'Active'
    },
    {
      id: 'EMP008',
      name: 'Kavya Nair',
      email: 'kavya.nair@company.com',
      department: 'Marketing',
      designation: 'Marketing Manager',
      salary: 1420000,
      status: 'Active'
    },
    {
      id: 'EMP009',
      name: 'Rohan Das',
      email: 'rohan.das@company.com',
      department: 'Finance',
      designation: 'Accountant',
      salary: 850000,
      status: 'Active'
    },
    {
      id: 'EMP010',
      name: 'Ananya Iyer',
      email: 'ananya.iyer@company.com',
      department: 'Product',
      designation: 'UX Designer',
      salary: 1180000,
      status: 'Inactive'
    }
  ]);

  readonly searchTerm = signal('');

  readonly selectedDepartment = signal('All');

  readonly selectedStatus = signal('All');

  readonly currentPage = signal(1);

  readonly pageSize = signal(5);

  readonly departments = computed(() => {

    const departmentSet = new Set(
      this.employees().map(employee => employee.department)
    );

    return Array.from(departmentSet).sort();
  });

  readonly filteredEmployees = computed(() => {

    const search = this.searchTerm()
      .trim()
      .toLowerCase();

    const department = this.selectedDepartment();

    const status = this.selectedStatus();

    return this.employees().filter(employee => {

      const matchesSearch =
        !search ||
        employee.name.toLowerCase().includes(search) ||
        employee.id.toLowerCase().includes(search) ||
        employee.email.toLowerCase().includes(search) ||
        employee.department.toLowerCase().includes(search) ||
        employee.designation.toLowerCase().includes(search);

      const matchesDepartment =
        department === 'All' ||
        employee.department === department;

      const matchesStatus =
        status === 'All' ||
        employee.status === status;

      return (
        matchesSearch &&
        matchesDepartment &&
        matchesStatus
      );
    });
  });

  readonly totalPages = computed(() => {

    return Math.max(
      1,
      Math.ceil(
        this.filteredEmployees().length /
        this.pageSize()
      )
    );
  });

  readonly paginatedEmployees = computed(() => {

    const start =
      (this.currentPage() - 1) *
      this.pageSize();

    const end =
      start + this.pageSize();

    return this.filteredEmployees().slice(start, end);
  });

  readonly startRecord = computed(() => {

    if (this.filteredEmployees().length === 0) {
      return 0;
    }

    return (
      (this.currentPage() - 1) *
      this.pageSize()
    ) + 1;
  });

  readonly endRecord = computed(() => {

    return Math.min(
      this.currentPage() * this.pageSize(),
      this.filteredEmployees().length
    );
  });

  setSearch(event: Event): void {

    const input =
      event.target as HTMLInputElement;

    this.searchTerm.set(input.value);

    this.currentPage.set(1);
  }

  setDepartment(event: Event): void {

    const select =
      event.target as HTMLSelectElement;

    this.selectedDepartment.set(select.value);

    this.currentPage.set(1);
  }

  setStatus(event: Event): void {

    const select =
      event.target as HTMLSelectElement;

    this.selectedStatus.set(select.value);

    this.currentPage.set(1);
  }

  clearFilters(): void {

    this.searchTerm.set('');
    this.selectedDepartment.set('All');
    this.selectedStatus.set('All');
    this.currentPage.set(1);
  }

  goToPage(page: number): void {

    if (
      page < 1 ||
      page > this.totalPages()
    ) {
      return;
    }

    this.currentPage.set(page);
  }

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
}