import { TestBed } from '@angular/core/testing';

import { EmployeeService as Employee } from './employee';

describe('Employee', () => {
  let service: Employee;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Employee);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
