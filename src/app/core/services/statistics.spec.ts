import { TestBed } from '@angular/core/testing';

import {StatisticsService as  Statistics } from './statistics';

describe('Statistics', () => {
  let service: Statistics;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Statistics);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
