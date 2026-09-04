import { TestBed } from '@angular/core/testing';

import {SalaryService as Salary } from './salary';

describe('Salary', () => {
  let service: Salary;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Salary);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
