import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

import {
  EmployeeService,
  CreateEmployeeRequest,
  UpdateEmployeeRequest,
} from '../../../core/services/employee';

import { DepartmentService } from '../../../core/services/department';
import { SalaryService } from '../../../core/services/salary';
import { Department } from '../../../core/models/department.model';
@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './employee-form.html',
  styleUrl: './employee-form.css',
})
export class EmployeeForm {
  private readonly fb = inject(FormBuilder);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly employeeService = inject(EmployeeService);
  private readonly departmentService = inject(DepartmentService);
  private readonly salaryService = inject(SalaryService);
  readonly departments = signal<Department[]>([]);
  readonly loadingDepartments = signal(false);

  readonly isEditMode = this.route.snapshot.paramMap.has('id');

  readonly employeeId = this.route.snapshot.paramMap.get('id');

  readonly employeeForm = this.fb.nonNullable.group({
    employeeCode: ['', [Validators.required, Validators.maxLength(20)]],

    firstName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],

    lastName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],

    email: ['', [Validators.required, Validators.email, Validators.maxLength(255)]],

    country: ['', [Validators.required, Validators.maxLength(2)]],

    departmentId: [-1, [Validators.min(1), Validators.required]],

    jobTitle: ['', [Validators.required, Validators.maxLength(150)]],

    hireDate: ['', Validators.required],
    amount: [0, [Validators.required, Validators.min(0)]],

    currency: ['INR', [Validators.required, Validators.pattern(/^[A-Z]{3}$/)]],

    effectiveDate: ['', Validators.required],
  });

readonly loading = signal(false);
readonly saving = signal(false);
readonly error = signal('');
  loadDepartments(): void {
    this.loadingDepartments.set(true);

    this.departmentService.getDepartments().subscribe({
      next: (departments) => {
        this.departments.set(departments);
        this.loadingDepartments.set(false);
      },

      error: (error) => {
        console.error('Failed to load departments', error);

        this.departments.set([]);
        this.loadingDepartments.set(false);
      },
    });
  }

  constructor() {
    this.loadDepartments();
    if (this.isEditMode && this.employeeId) {
      this.loadEmployee(Number(this.employeeId));
    }
  }

  loadEmployee(id: number): void {
    this.loading.set(true);
    this.error.set('');
    this.employeeService.getEmployee(id).subscribe({
      next: (employee) => {
        this.employeeForm.patchValue({
          employeeCode: employee.employeeCode,
          firstName: employee.firstName,
          lastName: employee.lastName,
          email: employee.email,
          country: employee.country,
          departmentId: employee.departmentId,
          jobTitle: employee.jobTitle,
          hireDate: employee.hireDate,
        });

        this.loading.set(false);
      },

      error: (error) => {
        console.error('Failed to load employee', error);

        this.error.set('Unable to load employee information.');

        this.loading.set(false);
      },
    });
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.employeeForm.get(fieldName);

    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  getFieldError(fieldName: string): string {
    const field = this.employeeForm.get(fieldName);

    if (!field || !field.errors) {
      return '';
    }

    if (field.errors['required']) {
      return 'This field is required.';
    }

    if (field.errors['email']) {
      return 'Please enter a valid email address.';
    }

    if (field.errors['minlength']) {
      return `Minimum ${field.errors['minlength'].requiredLength} characters required.`;
    }

    if (field.errors['maxlength']) {
      return `Maximum ${field.errors['maxlength'].requiredLength} characters allowed.`;
    }

    return 'Invalid value.';
  }

  saveEmployee(): void {
    if (this.employeeForm.invalid) {
      this.employeeForm.markAllAsTouched();
      return;
    }

    this.saving.set(true);
    this.error.set('');

    if (this.isEditMode && this.employeeId) {
      const payload: UpdateEmployeeRequest = {
        firstName: this.employeeForm.value.firstName!,
        lastName: this.employeeForm.value.lastName!,
        email: this.employeeForm.value.email!,
        country: this.employeeForm.value.country!,
        departmentId: this.employeeForm.value.departmentId!,
        jobTitle: this.employeeForm.value.jobTitle!,
        hireDate: this.employeeForm.value.hireDate!,
      };

      this.employeeService.updateEmployee(Number(this.employeeId), payload).subscribe({
        next: (employee) => {
          this.saving.set(false);

          this.router.navigate(['/employees', employee.id]);
        },

        error: (error) => {
          console.error('Failed to update employee', error);

          this.error.set('Unable to update employee. Please try again.');

          this.saving.set(false);
        },
      });
    } else {
      const payload: CreateEmployeeRequest = {
        employeeCode: this.employeeForm.value.employeeCode!,

        firstName: this.employeeForm.value.firstName!,

        lastName: this.employeeForm.value.lastName!,

        email: this.employeeForm.value.email!,

        country: this.employeeForm.value.country!,

        departmentId: this.employeeForm.value.departmentId!,

        jobTitle: this.employeeForm.value.jobTitle!,

        hireDate: this.employeeForm.value.hireDate!,
      };

      this.employeeService.createEmployee(payload).subscribe({
        next: (employee) => {
          this.salaryService
            .createSalary(employee.id, {
              amount: this.employeeForm.value.amount!,
              currency: this.employeeForm.value.currency!,
              effectiveDate: this.employeeForm.value.effectiveDate!,
            })
            .subscribe({
              next: () => {
                this.saving.set(false);

                this.router.navigate(['/employees', employee.id]);
              },

              error: (error) => {
                console.error('Employee created but salary creation failed', error);

                this.error .set('Employee was created, but salary could not be saved. Please add the salary from Manage Salary.');

                this.saving.set(false);
              },
            });
        },

        error: (error) => {
          console.error('Failed to create employee', error);

          this.error.set('Unable to create employee. Please try again.');

          this.saving.set(false);
        },
      });
    }
  }

  cancel(): void {
    if (this.isEditMode && this.employeeId) {
      this.router.navigate(['/employees', this.employeeId]);
      return;
    }

    this.router.navigate(['/employees']);
  }
}
