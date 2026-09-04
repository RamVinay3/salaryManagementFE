import { Routes } from '@angular/router';
import { MainLayout } from './layout/main-layout/main-layout';
import { Dashboard } from './features/dashboard/dashboard';

import { Employees } from './features/employees/employees';
import { EmployeeForm } from './features/employees/employee-form/employee-form';




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

