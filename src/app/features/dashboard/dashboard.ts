import { Component } from '@angular/core';
import { Card } from '../../shared/components/card/card';

interface StatCard {
  title: string;
  value: string;
  change: string;
  changeType: 'positive' | 'negative';
  icon: string;
}

interface Employee {
  id: string;
  name: string;
  department: string;
  salary: number;
  status: 'Active' | 'Inactive';
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [Card],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard {

  readonly stats: StatCard[] = [
    {
      title: 'Total Employees',
      value: '10,000',
      change: '+4.8%',
      changeType: 'positive',
      icon: '♙'
    },
    {
      title: 'Average Salary',
      value: '₹8.68L',
      change: '+3.2%',
      changeType: 'positive',
      icon: '₹'
    },
    {
      title: 'Highest Salary',
      value: '₹28.75L',
      change: '+8.1%',
      changeType: 'positive',
      icon: '↗'
    },
    {
      title: 'Monthly Payroll',
      value: '₹72.4Cr',
      change: '+5.6%',
      changeType: 'positive',
      icon: '▣'
    }
  ];

  readonly recentEmployees: Employee[] = [
    {
      id: 'EMP001',
      name: 'Amit Sharma',
      department: 'Engineering',
      salary: 1250000,
      status: 'Active'
    },
    {
      id: 'EMP002',
      name: 'Priya Reddy',
      department: 'Product',
      salary: 1870000,
      status: 'Active'
    },
    {
      id: 'EMP003',
      name: 'Rahul Kumar',
      department: 'Sales',
      salary: 1560000,
      status: 'Active'
    },
    {
      id: 'EMP004',
      name: 'Sneha Patel',
      department: 'Engineering',
      salary: 1120000,
      status: 'Active'
    },
    {
      id: 'EMP005',
      name: 'Arjun Mehta',
      department: 'Finance',
      salary: 980000,
      status: 'Inactive'
    }
  ];

  formatSalary(salary: number): string {
    return `₹${(salary / 100000).toFixed(2)}L`;
  }
}