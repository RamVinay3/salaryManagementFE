import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';

import { EmployeeSalary } from './employee-salary';

describe('EmployeeSalary', () => {

  let component: EmployeeSalary;
  let fixture: ComponentFixture<EmployeeSalary>;

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      imports: [EmployeeSalary],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: () => '952'
              }
            }
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(EmployeeSalary);
    component = fixture.componentInstance;

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});