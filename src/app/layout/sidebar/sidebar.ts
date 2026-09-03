import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

interface NavigationItem {
  label: string;
  icon: string;
  route: string;
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css'
})
export class Sidebar {

  navigationItems: NavigationItem[] = [
    {
      label: 'Dashboard',
      icon: '▦',
      route: '/dashboard'
    },
    {
      label: 'Employees',
      icon: '♙',
      route: '/employees'
    },
    {
      label: 'Salary Updates',
      icon: '₹',
      route: '/salary-updates'
    },
    {
      label: 'Reports',
      icon: '▥',
      route: '/reports'
    }
  ];

  settingsItems: NavigationItem[] = [
    {
      label: 'Settings',
      icon: '⚙',
      route: '/settings'
    }
  ];
}