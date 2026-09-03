export interface Employee {
  id: string;
  name: string;
  email: string;
  department: string;
  designation: string;
  salary: number;
  status: 'Active' | 'Inactive';
}