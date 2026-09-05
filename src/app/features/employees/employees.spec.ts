import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';

import { Employees } from './employees';

describe('Employees', () => {

  let component: Employees;
  let fixture: ComponentFixture<Employees>;

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      imports: [Employees],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: () => null
              }
            }
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(Employees);
    component = fixture.componentInstance;

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});