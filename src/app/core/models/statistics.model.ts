export interface EmployeeCountByCountry {
  country: string;
  count: number;
}

export interface EmployeeCountByDepartment {
  department: string;
  count: number;
}

export interface AverageSalaryByCurrency {
  currency: string;
  averageSalary: number;
}

export interface HighestPaidEmployee {
  employeeId: number;
  employeeCode: string;
  employeeName: string;
  salary: number;
  currency: string;
}

export interface SalaryStatisticsByCountry {
  country: string;
  currency: string;
  employeeCount: number;
  minimumSalary: number;
  averageSalary: number;
  maximumSalary: number;
  highestPaidEmployeeCount: number;
  highestPaidEmployees: HighestPaidEmployee[];
}

export interface Statistics {
  totalEmployees: number;
  employeesByCountry: EmployeeCountByCountry[];
  employeesByDepartment: EmployeeCountByDepartment[];
  averageSalaryByCurrency: AverageSalaryByCurrency[];
  salaryStatisticsByCountry: SalaryStatisticsByCountry[];
}