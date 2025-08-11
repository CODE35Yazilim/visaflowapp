import { Component, Input, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgApexchartsModule } from 'ng-apexcharts';
import {
  ApexNonAxisChartSeries,
  ApexChart,
  ApexLegend,
  ApexResponsive,
  ApexTooltip
} from 'ng-apexcharts';

import { ReportService } from '../../../proxy/reports/report.service';
import { VisaTypeStatsDto } from '../../../proxy/reports/models';

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  labels: string[];
  legend: ApexLegend;
  responsive?: ApexResponsive[];
  tooltip?: ApexTooltip;
};

@Component({
  standalone: true,
  selector: 'app-visa-type-report-widget',
  templateUrl: './visa-type-report-widget.component.html',
  imports: [CommonModule, NgApexchartsModule],
})
export class VisaTypeReportWidgetComponent {
  @Input() height = 350;
  chartOptions: Partial<ChartOptions> = {};

  constructor(private reportService: ReportService, private cdr: ChangeDetectorRef) {}

  draw({ startDate, endDate }: { startDate: string; endDate: string }) {
    this.reportService.getVisaTypeStats(startDate, endDate).subscribe((data: VisaTypeStatsDto[]) => {
      const accepted = data.reduce((sum, x) => sum + (x.accepted ?? 0), 0);
      const rejected = data.reduce((sum, x) => sum + (x.rejected ?? 0), 0);

      this.chartOptions = {
        series: [accepted, rejected],
        labels: ['Kabul Edilen', 'Reddedilen'],
        chart: {
          type: 'pie',
          height: this.height
        },
        legend: {
          position: 'bottom'
        },
        tooltip: {
          y: {
            formatter: (val) => `${val} başvuru`
          }
        },
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 250
              },
              legend: {
                position: 'bottom'
              }
            }
          }
        ]
      };

      this.cdr.detectChanges();
    });
  }
}
