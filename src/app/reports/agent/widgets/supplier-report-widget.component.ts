import { Component, Input, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgApexchartsModule } from 'ng-apexcharts';
import {
  ApexNonAxisChartSeries,
  ApexChart,
  ApexLegend,
  ApexTooltip,
  ApexResponsive
} from 'ng-apexcharts';

import { ReportService } from '../../../proxy/reports/report.service';
import { SupplierReportDto } from '../../../proxy/reports/models';

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  labels: string[];
  legend?: ApexLegend;
  tooltip?: ApexTooltip;
  responsive?: ApexResponsive[];
};

@Component({
  standalone: true,
  selector: 'app-supplier-report-widget',
  templateUrl: './supplier-report-widget.component.html',
  imports: [CommonModule, NgApexchartsModule],
})
export class SupplierReportWidgetComponent {
  @Input() height = 350;

  chartOptions: Partial<ChartOptions> = {};

  constructor(private reportService: ReportService, private cdr: ChangeDetectorRef) {}

  draw({ startDate, endDate }: { startDate: string; endDate: string }) {
    this.reportService.getSupplierReport(startDate, endDate).subscribe((data: SupplierReportDto[]) => {
      this.chartOptions = {
        series: data.map(x => x.totalPaid),
        labels: data.map(x => x.supplierName),
        chart: {
          type: 'pie',
          height: this.height
        },
        tooltip: {
          y: {
            formatter: val => `€ ${val.toLocaleString()}`
          }
        },
        legend: {
          position: 'right'
        },
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 200
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
