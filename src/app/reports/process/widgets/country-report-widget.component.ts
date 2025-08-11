import { Component, Input, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgApexchartsModule } from 'ng-apexcharts';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexPlotOptions,
  ApexFill,
  ApexTooltip
} from 'ng-apexcharts';

import { ReportService } from '../../../proxy/reports/report.service';
import { CountryApplicationStatsDto } from '../../../proxy/reports/models';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  dataLabels: ApexDataLabels;
  fill: ApexFill;
  plotOptions: ApexPlotOptions;
  tooltip: ApexTooltip;
};

@Component({
  standalone: true,
  selector: 'app-country-report-widget',
  templateUrl: './country-report-widget.component.html',
  imports: [CommonModule, NgApexchartsModule],
})
export class CountryReportWidgetComponent {
  @Input() height = 350;

  chartOptions: Partial<ChartOptions> = {};

  constructor(private reportService: ReportService, private cdr: ChangeDetectorRef) {}

  draw({ startDate, endDate }: { startDate: string; endDate: string }) {
    this.reportService.getCountryApplicationStats(startDate, endDate).subscribe((data: CountryApplicationStatsDto[]) => {
      this.chartOptions = {
        series: [
          {
            name: 'Başvuru Sayısı',
            data: data.map(x => x.totalApplications),
          }
        ],
        chart: {
          type: 'bar',
          height: this.height
        },
        xaxis: {
          categories: data.map(x => x.countryName),
          labels: {
            rotate: -45
          }
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: '55%',
            borderRadius: 4 // "endingShape" yerine bu kullanılmalı
          }
        }
        ,
        dataLabels: {
          enabled: true
        },
        fill: {
          opacity: 1
        },
        tooltip: {
          y: {
            formatter: val => `${val} başvuru`
          }
        }
      };

      this.cdr.detectChanges();
    });
  }
}
