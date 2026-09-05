export interface EmployeeCountByCountry {
  country: string;
  count: number;
}

export interface EmployeeCountByDepartment {
  departmentName: string;
  count: number;
}

export interface AverageSalaryByCurrency {
  currency: string;
  averageSalary: number;
}

export interface Statistics {
  totalEmployees: number;
  employeesByCountry: EmployeeCountByCountry[];
  employeesByDepartment: EmployeeCountByDepartment[];
  averageSalaryByCurrency: AverageSalaryByCurrency[];
}