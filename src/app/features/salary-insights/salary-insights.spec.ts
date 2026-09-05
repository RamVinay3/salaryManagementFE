import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalaryInsights } from './salary-insights';

describe('SalaryInsights', () => {
  let component: SalaryInsights;
  let fixture: ComponentFixture<SalaryInsights>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SalaryInsights]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SalaryInsights);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
