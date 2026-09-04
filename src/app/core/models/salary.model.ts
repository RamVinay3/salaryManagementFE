export interface Salary {
  id: number;
  employeeId: number;
  amount: number;
  currency: string;
  effectiveDate: string;
}

export interface SalaryUpdateRequest {
  amount: number;
  currency: string;
  effectiveDate: string;
}