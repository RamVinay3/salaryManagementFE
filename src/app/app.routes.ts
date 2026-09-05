import { Routes } from '@angular/router';
import { MainLayout } from './layout/main-layout/main-layout';
import { Dashboard } from './features/dashboard/dashboard';

import { Employees } from './features/employees/employees';
import { EmployeeForm } from './features/employees/employee-form/employee-form';
import { EmployeeDetails } from './features/employees/employee-details/employee-details';
import { EmployeeSalary } from './features/employees/employee-salary/employee-salary';




export const routes: Routes = [
  {
    path: '',
    component: MainLayout,
    children: [
      {
    path: 'dashboard',
    component: Dashboard
  },
  {
    path: 'employees/new',
    component: EmployeeForm
  },
  {
  path: 'employees/:id/edit',
  component: EmployeeForm
  },
  {
  path: 'employees/:id/salary',
  component: EmployeeSalary
},
  {
  path: 'employees/:id',
  component: EmployeeDetails
  },
  {
    path: 'employees',
    component: Employees
  },
  
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'dashboard'
  }
    ]
  }
];

