import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnalyticsService } from '../../services/analytics';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import {
  Chart,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
  Legend,
  Tooltip
} from 'chart.js';

import {
  BaseChartDirective
} from 'ng2-charts';

import {
  ChartConfiguration,
  ChartOptions
} from 'chart.js';


Chart.register(
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
  Legend,
  Tooltip
);

@Component({
  selector: 'app-analytics',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    BaseChartDirective
  ],
  templateUrl: './analytics.html',
  styleUrls: ['./analytics.scss']
})
export class Analytics implements OnInit {
  constructor(
  private analyticsService: AnalyticsService
) {}

stats = {

  users30Days: 0,

  pageViews30Days: 0,

  totalUsers: 0,

  totalPageViews: 0,

  usersToday: 0,

  activeNow: 0
};

async ngOnInit() {

  try {

    const data =
      await this.analyticsService.getAnalytics();

    console.log(data);

    this.stats.users30Days =
      data.users30Days;

    this.stats.pageViews30Days =
      data.pageViews30Days;

    this.stats.totalUsers =
      data.totalUsers;

    this.stats.totalPageViews =
      data.totalPageViews;

  } catch (err) {

    console.error('FUNCTION ERROR:', err);

  }
}

  lineChartData: ChartConfiguration<'line'>['data'] = {
    labels: [
      '1 May',
      '5 May',
      '10 May',
      '15 May',
      '20 May',
      '25 May'
    ],
    datasets: [
      {
        data: [12, 19, 30, 45, 38, 50],
        label: 'Visitors',
        fill: false,
        tension: 0.3
      }
    ]
  };

  lineChartOptions: ChartOptions<'line'> = {
    responsive: true
  };

  countries = [
    { name: 'North Macedonia', users: 88 },
    { name: 'USA', users: 15 },
    { name: 'Switzerland', users: 2 },
    { name: 'Germany', users: 1 }
  ];

  pages = [
    {
      name: 'Turniri.mk',
      views: 135
    },
    {
      name: 'Спортски турнири',
      views: 126
    }
  ];

}