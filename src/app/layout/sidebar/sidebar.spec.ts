import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Sidebar } from './sidebar';
import { ThemeService } from '../../core/services/theme';
import { provideRouter } from '@angular/router';

describe('Sidebar', () => {
  let component: Sidebar;
  let fixture: ComponentFixture<Sidebar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Sidebar],
      providers: [
         provideRouter([]),
        {
          provide: ThemeService,
          useValue: {
            theme: () => 'light',
            toggleTheme: () => {}
          }
        },
        {
          provide: ThemeService,
          useValue: {
            theme: () => 'light',
            toggleTheme: () => {}
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(Sidebar);
    component = fixture.componentInstance;

    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});