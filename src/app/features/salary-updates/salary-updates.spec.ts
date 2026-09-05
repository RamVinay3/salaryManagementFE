import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalaryUpdates } from './salary-updates';

describe('SalaryUpdates', () => {
  let component: SalaryUpdates;
  let fixture: ComponentFixture<SalaryUpdates>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SalaryUpdates]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SalaryUpdates);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
