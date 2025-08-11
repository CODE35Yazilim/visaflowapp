import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgApexchartsModule } from 'ng-apexcharts';
import {
  ApexNonAxisChartSeries,
  ApexChart,
  ApexResponsive,
  ApexLegend,
} from 'ng-apexcharts';

import { ReportService } from '../../../proxy/reports/report.service';
import { FinancePieChartDto } from '../../../proxy/reports/models';

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  labels: string[];
  responsive: ApexResponsive[];
  legend: ApexLegend;
};

@Component({
  standalone: true,
  selector: 'app-finance-pie-chart-widget',
  templateUrl: './finance-pie-chart-widget.component.html',
  imports: [CommonModule, NgApexchartsModule],
})
export class FinancePieChartWidgetComponent {
  @Input() height = 350;

  chartOptions: Partial<ChartOptions> = {};

  constructor(private reportService: ReportService) {}

  draw({ startDate, endDate }: { startDate: string; endDate: string }) {
    this.reportService.getFinancePieChart(startDate, endDate).subscribe((data: FinancePieChartDto) => {
      const receivables = data.totalCollection - data.totalPayment;
      const profit = data.totalPayment - data.totalCost;

      this.chartOptions = {
        series: [data.totalPayment, receivables, profit],
        labels: ['Tahsil Edilen', 'Kalan Alacak', 'Kâr'],
        chart: {
          type: 'pie',
          height: this.height,
        },
        
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 200,
              },
              legend: {
                position: 'bottom',
              },
            },
          },
        ],
        legend: {
          position: 'bottom',
          horizontalAlign: 'center',
        },

      };
    });
  }
}
