import { TestBed } from '@angular/core/testing';

import { ThemeService } from './theme';

describe('Theme', () => {

  let service: ThemeService;

  beforeEach(() => {

    Object.defineProperty(globalThis, 'localStorage', {
      value: {
        getItem: () => null,
        setItem: () => {}
      },
      configurable: true
    });

    TestBed.configureTestingModule({});

    service = TestBed.inject(ThemeService);

  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

});