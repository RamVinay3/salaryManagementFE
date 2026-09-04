export interface Employee {
  id: number;
  employeeCode: string;
  firstName: string;
  lastName: string;
  email: string;
  country: string;
  departmentId: number;
  departmentName: string;
  jobTitle: string;
  hireDate: string;
  createdAt?: string;
  updatedAt?: string;
}