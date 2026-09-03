import { DOCUMENT } from '@angular/common';
import { Injectable, inject, signal } from '@angular/core';

export type Theme = 'light' | 'dark';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  private readonly document = inject(DOCUMENT);

  private readonly storageKey = 'salary-management-theme';

  readonly theme = signal<Theme>(this.getInitialTheme());

  constructor() {
    this.applyTheme(this.theme());
  }

  toggleTheme(): void {
    const nextTheme: Theme =
      this.theme() === 'light'
        ? 'dark'
        : 'light';

    this.setTheme(nextTheme);
  }

  setTheme(theme: Theme): void {
    this.theme.set(theme);

    this.applyTheme(theme);

    localStorage.setItem(
      this.storageKey,
      theme
    );
  }

  private applyTheme(theme: Theme): void {
    this.document.documentElement.setAttribute(
      'data-theme',
      theme
    );
  }

  private getInitialTheme(): Theme {

    const savedTheme =
      localStorage.getItem(this.storageKey);

    if (
      savedTheme === 'light' ||
      savedTheme === 'dark'
    ) {
      return savedTheme;
    }

    return 'light';
  }
}