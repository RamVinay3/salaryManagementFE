import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

import { SalaryService } from '../../../core/services/salary';

@Component({
  selector: 'app-employee-salary',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './employee-salary.html',
  styleUrl: './employee-salary.css'
})
export class EmployeeSalary {

  private readonly fb = inject(FormBuilder);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly salaryService = inject(SalaryService);

  readonly loading = signal(false);
  readonly saving = signal(false);
  readonly error = signal('');
  readonly success = signal('');

  readonly employeeId = Number(
    this.route.snapshot.paramMap.get('id')
  );

  readonly salaryForm = this.fb.nonNullable.group({
    amount: [
      0,
      [
        Validators.required,
        Validators.min(0)
      ]
    ],

    currency: [
      'INR',
      [
        Validators.required,
        Validators.pattern(/^[A-Z]{3}$/)
      ]
    ],

    effectiveDate: [
      '',
      Validators.required
    ]
  });

  constructor() {
    if (!this.employeeId) {
      this.error.set('Invalid employee ID.');
    }
  }

  saveSalary(): void {
    this.error.set('');
    this.success.set('');

    if (this.salaryForm.invalid) {
      this.salaryForm.markAllAsTouched();
      return;
    }

    this.saving.set(true);

    this.salaryService
      .createSalary(
        this.employeeId,
        this.salaryForm.getRawValue()
      )
      .subscribe({
        next: () => {
          this.saving.set(false);
          this.success.set(
            'Salary updated successfully.'
          );

          setTimeout(() => {
            this.router.navigate([
              '/employees',
              this.employeeId
            ]);
          }, 500);
        },

        error: error => {
          console.error(
            'Failed to update salary',
            error
          );

          this.saving.set(false);

          if (error?.status === 409) {
            this.error.set(
              'A salary already exists for this effective date.'
            );
          } else if (error?.status === 400) {
            this.error.set(
              'Please check the salary details and try again.'
            );
          } else if (error?.status === 404) {
            this.error.set(
              'Employee could not be found.'
            );
          } else {
            this.error.set(
              'Unable to update salary. Please try again.'
            );
          }
        }
      });
  }
}