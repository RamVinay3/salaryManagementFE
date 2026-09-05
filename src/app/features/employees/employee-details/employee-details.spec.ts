import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';

import { EmployeeDetails } from './employee-details';

describe('EmployeeDetails', () => {

  let component: EmployeeDetails;
  let fixture: ComponentFixture<EmployeeDetails>;

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      imports: [EmployeeDetails],
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

    fixture = TestBed.createComponent(EmployeeDetails);
    component = fixture.componentInstance;

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});