import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EMPLOYEES } from '../../../core/data/employee.data';

@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './employee-form.html',
  styleUrl: './employee-form.css'
})
export class EmployeeForm {

  private readonly formBuilder = inject(FormBuilder);

  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

   readonly isEditMode =
    this.route.snapshot.paramMap.has('id');

  readonly employeeId =
    this.route.snapshot.paramMap.get('id');


  readonly employeeForm = this.formBuilder.nonNullable.group({

    firstName: [
      '',
      [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(50)
      ]
    ],

    lastName: [
      '',
      [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(50)
      ]
    ],

    email: [
      '',
      [
        Validators.required,
        Validators.email
      ]
    ],

    phone: [
      '',
      [
        Validators.required,
        Validators.pattern(/^[6-9]\d{9}$/)
      ]
    ],

    department: [
      '',
      Validators.required
    ],

    designation: [
      '',
      [
        Validators.required,
        Validators.maxLength(100)
      ]
    ],

    joiningDate: [
      '',
      Validators.required
    ],

    salary: [
      0,
      [
        Validators.required,
        Validators.min(1),
        Validators.max(100000000)
      ]
    ],

    status: [
      'Active',
      Validators.required
    ]
  });

  readonly departments = [
    'Engineering',
    'Product',
    'Sales',
    'Finance',
    'HR',
    'Marketing'
  ];

  isFieldInvalid(
    fieldName: keyof typeof this.employeeForm.controls
  ): boolean {

    const field = this.employeeForm.controls[fieldName];

    return field.invalid && field.touched;
  }

  getFieldError(
    fieldName: keyof typeof this.employeeForm.controls
  ): string {

    const field = this.employeeForm.controls[fieldName];

    if (field.hasError('required')) {
      return 'This field is required.';
    }

    if (field.hasError('email')) {
      return 'Enter a valid email address.';
    }

    if (field.hasError('minlength')) {
      return 'Value is too short.';
    }

    if (field.hasError('maxlength')) {
      return 'Value is too long.';
    }

    if (field.hasError('pattern')) {
      return 'Enter a valid 10-digit mobile number.';
    }

    if (field.hasError('min')) {
      return 'Salary must be greater than zero.';
    }

    return '';
  }

  saveEmployee(): void {

    if (this.employeeForm.invalid) {

      this.employeeForm.markAllAsTouched();

      return;
    }

    const formValue = this.employeeForm.getRawValue();

    const payload = {
      ...formValue,
      salary: Number(formValue.salary)
    };

    console.log('Employee payload:', payload);

    // API integration will be added later.
  }

  cancel(): void {
    this.router.navigate(['/employees']);
  }



  constructor() {

    if (!this.isEditMode || !this.employeeId) {
      return;
    }

    const employee =
      EMPLOYEES.find(
        item => item.id === this.employeeId
      );

    if (!employee) {
      this.router.navigate(['/employees']);

      return;
    }

    const [firstName, ...lastNameParts] =
      employee.name.split(' ');

    this.employeeForm.patchValue({
      firstName,
      lastName: lastNameParts.join(' '),
      email: employee.email,
      phone: employee.phone,
      department: employee.department,
      designation: employee.designation,
      joiningDate: employee.joiningDate,
      salary: employee.salary,
      status: employee.status
    });
  }
}