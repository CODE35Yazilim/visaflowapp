import { Component, Input, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgApexchartsModule } from 'ng-apexcharts';
import {
  ApexChart,
  ApexAxisChartSeries,
  ApexXAxis,
  ApexDataLabels,
  ApexPlotOptions,
  ApexTooltip,
  ApexYAxis,
  ApexLegend
} from 'ng-apexcharts';

import { ReportService } from '../../../proxy/reports/report.service';
import { ProductSalesReportDto } from '../../../proxy/reports/models';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  yaxis?: ApexYAxis;
  dataLabels?: ApexDataLabels;
  plotOptions?: ApexPlotOptions;
  tooltip?: ApexTooltip;
  legend?: ApexLegend;
};

@Component({
  standalone: true,
  selector: 'app-product-sales-widget',
  templateUrl: './product-sales-widget.component.html',
  imports: [CommonModule, NgApexchartsModule],
})
export class ProductSalesWidgetComponent {
  @Input() height = 300;
  chartOptions: Partial<ChartOptions> = {};

  constructor(private reportService: ReportService, private cdr: ChangeDetectorRef) {}

  draw({ startDate, endDate }: { startDate: string; endDate: string }) {
    this.reportService.getProductSalesReport(startDate, endDate).subscribe((data: ProductSalesReportDto[]) => {
      const labels = data.map(x => `${x.productName} - Adet: ${x.totalPieces}`);
      const values = data.map(x => x.totalAmount);

      this.chartOptions = {
        series: [
          {
            name: 'Satış Toplamı',
            data: values
          }
        ],
        chart: {
          type: 'bar',
          height: this.height
        },
        xaxis: {
          categories: labels,
          labels: {
            rotate: -45,
            trim: true,
            style: {
              fontSize: '12px'
            }
          }
        },
        yaxis: {
          labels: {
            formatter: val => `${val.toFixed(0)} ₺`
          }
        },
        tooltip: {
          y: {
            formatter: val => `${val.toFixed(2)} ₺`
          }
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: '50%'
          }
        },
        dataLabels: {
          enabled: false
        },
        legend: {
          position: 'top'
        }
      };

      this.cdr.detectChanges();
    });
  }
}
