import { Component, inject, signal } from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import {
  ActivatedRoute,
  Router,
  RouterLink
} from '@angular/router';

import {
  EmployeeService,
  CreateEmployeeRequest,
  UpdateEmployeeRequest
} from '../../../core/services/employee';

import { DepartmentService } from '../../../core/services/department';
import { Department } from '../../../core/models/department.model';
@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './employee-form.html',
  styleUrl: './employee-form.css'
})
export class EmployeeForm {

  private readonly fb = inject(FormBuilder);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly employeeService = inject(EmployeeService);
  private readonly departmentService =inject(DepartmentService);
  readonly departments = signal<Department[]>([]);
readonly loadingDepartments = signal(false);

  readonly isEditMode =
    this.route.snapshot.paramMap.has('id');

  readonly employeeId =
    this.route.snapshot.paramMap.get('id');

  readonly employeeForm = this.fb.nonNullable.group({
    employeeCode: [
      '',
      [
        Validators.required,
        Validators.maxLength(20)
      ]
    ],

    firstName: [
      '',
      [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(100)
      ]
    ],

    lastName: [
      '',
      [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(100)
      ]
    ],

    email: [
      '',
      [
        Validators.required,
        Validators.email,
        Validators.maxLength(255)
      ]
    ],

    country: [
      '',
      [
        Validators.required,
        Validators.maxLength(2)
      ]
    ],

    departmentId: [
      -1,
      [Validators.min(1),Validators.required]
      
    ],

    jobTitle: [
      '',
      [
        Validators.required,
        Validators.maxLength(150)
      ]
    ],

    hireDate: [
      '',
      Validators.required
    ]
  });

  loading = false;
  saving = false;
  error = '';
  loadDepartments(): void {
  this.loadingDepartments.set(true);

  this.departmentService
    .getDepartments()
    .subscribe({
      next: departments => {
        this.departments.set(departments);
        this.loadingDepartments.set(false);
      },

      error: error => {
        console.error(
          'Failed to load departments',
          error
        );

        this.departments.set([]);
        this.loadingDepartments.set(false);
      }
    });
}

  constructor() {
    this.loadDepartments();
    if (this.isEditMode && this.employeeId) {
      this.loadEmployee(Number(this.employeeId));
    }
  }

  loadEmployee(id: number): void {
    this.loading = true;
    this.error = '';

    this.employeeService.getEmployee(id).subscribe({
      next: employee => {
        this.employeeForm.patchValue({
          employeeCode: employee.employeeCode,
          firstName: employee.firstName,
          lastName: employee.lastName,
          email: employee.email,
          country: employee.country,
          departmentId: employee.departmentId,
          jobTitle: employee.jobTitle,
          hireDate: employee.hireDate
        });

        this.loading = false;
      },

      error: error => {
        console.error('Failed to load employee', error);

        this.error =
          'Unable to load employee information.';

        this.loading = false;
      }
    });
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.employeeForm.get(fieldName);

    return !!(
      field &&
      field.invalid &&
      (field.dirty || field.touched)
    );
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

    this.saving = true;
    this.error = '';

    if (this.isEditMode && this.employeeId) {

      const payload: UpdateEmployeeRequest = {
        firstName: this.employeeForm.value.firstName!,
        lastName: this.employeeForm.value.lastName!,
        email: this.employeeForm.value.email!,
        country: this.employeeForm.value.country!,
        departmentId: this.employeeForm.value.departmentId!,
        jobTitle: this.employeeForm.value.jobTitle!,
        hireDate: this.employeeForm.value.hireDate!
      };

      this.employeeService
        .updateEmployee(
          Number(this.employeeId),
          payload
        )
        .subscribe({
          next: employee => {
            this.saving = false;

            this.router.navigate([
              '/employees',
              employee.id
            ]);
          },

          error: error => {
            console.error(
              'Failed to update employee',
              error
            );

            this.error =
              'Unable to update employee. Please try again.';

            this.saving = false;
          }
        });

    } else {

      const payload: CreateEmployeeRequest = {
        employeeCode:
          this.employeeForm.value.employeeCode!,

        firstName:
          this.employeeForm.value.firstName!,

        lastName:
          this.employeeForm.value.lastName!,

        email:
          this.employeeForm.value.email!,

        country:
          this.employeeForm.value.country!,

        departmentId:
          this.employeeForm.value.departmentId!,

        jobTitle:
          this.employeeForm.value.jobTitle!,

        hireDate:
          this.employeeForm.value.hireDate!
      };

      this.employeeService
        .createEmployee(payload)
        .subscribe({
          next: employee => {
            this.saving = false;

            this.router.navigate([
              '/employees',
              employee.id
            ]);
          },

          error: error => {
            console.error(
              'Failed to create employee',
              error
            );

            this.error =
              'Unable to create employee. Please try again.';

            this.saving = false;
          }
        });
    }
  }

  cancel(): void {
    if (this.isEditMode && this.employeeId) {
      this.router.navigate([
        '/employees',
        this.employeeId
      ]);
      return;
    }

    this.router.navigate(['/employees']);
  }
}