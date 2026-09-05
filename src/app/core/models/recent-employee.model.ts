export interface RecentEmployee {
  id: number;
  employeeCode: string;
  firstName: string;
  lastName: string;
  department: string;
  salary: number | null;
  currency: string | null;
  status: 'Active' | 'Inactive';
}