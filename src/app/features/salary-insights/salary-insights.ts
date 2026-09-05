import { Component, computed, inject, signal } from '@angular/core';
import { DecimalPipe } from '@angular/common';

import { Card } from '../../shared/components/card/card';
import { StatisticsService } from '../../core/services/statistics';
import {
  SalaryStatisticsByCountry,
  Statistics
} from '../../core/models/statistics.model';

@Component({
  selector: 'app-salary-insights',
  standalone: true,
  imports: [Card, DecimalPipe],
  templateUrl: './salary-insights.html',
  styleUrl: './salary-insights.css'
})
export class SalaryInsights {

  private readonly statisticsService = inject(StatisticsService);

  readonly statistics = signal<Statistics | undefined>(undefined);
  readonly loading = signal(true);
  readonly error = signal('');

  readonly salaryStatistics = computed(
    () => this.statistics()?.salaryStatisticsByCountry ?? []
  );

  constructor() {
    this.loadStatistics();
  }

  private loadStatistics(): void {
    this.loading.set(true);
    this.error.set('');

    this.statisticsService.getStatistics().subscribe({
      next: statistics => {
        this.statistics.set(statistics);
        this.loading.set(false);
      },
      error: error => {
        console.error('Failed to load salary statistics', error);
        this.error.set('Unable to load salary insights. Please try again.');
        this.loading.set(false);
      }
    });
  }

  formatSalary(
    amount: number,
    currency: string
  ): string {
    return `${amount.toLocaleString('en-IN', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })} ${currency}`;
  }

  getHighestPaidEmployees(
    statistic: SalaryStatisticsByCountry
  ) {
    return statistic.highestPaidEmployees;
  }
}