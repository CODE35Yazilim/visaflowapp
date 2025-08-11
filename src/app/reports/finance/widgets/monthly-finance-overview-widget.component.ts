import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportService } from '../../../proxy/reports/report.service';
import { MonthlyFinanceOverviewDto } from '../../../proxy/reports/models';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexPlotOptions,
  ApexStroke,
  ApexFill,
  ApexTooltip,
  ApexLegend
} from 'ng-apexcharts';
import { NgApexchartsModule } from 'ng-apexcharts';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  stroke: ApexStroke;
  fill: ApexFill;
  tooltip: ApexTooltip;
  legend: ApexLegend;
};

@Component({
  standalone: true,
  selector: 'app-monthly-finance-overview-widget',
  templateUrl: './monthly-finance-overview-widget.component.html',
  imports: [CommonModule,NgApexchartsModule],
})
export class MonthlyFinanceOverviewWidgetComponent {
  @Input() height = 350;
  chartOptions: Partial<ChartOptions>;

  constructor(private reportService: ReportService) {}

  draw({ startDate, endDate }: { startDate: string; endDate: string }) {
    this.reportService.getMonthlyFinanceOverview(startDate, endDate).subscribe((data: MonthlyFinanceOverviewDto[]) => {
      this.chartOptions = {
        series: [
          {
            name: 'Satış (Collection)',
            data: data.map(x => x.totalCollection ?? 0),
          },
          {
            name: 'Gelir (Payment)',
            data: data.map(x => x.totalPayment ?? 0),
          },
          {
            name: 'Gider (Cost)',
            data: data.map(x => x.totalCost ?? 0),
          },
        ],
        chart: {
          type: 'bar',
          height: this.height,
          toolbar: { show: false },
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: '50%',
          },
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          show: true,
          width: 1,
          colors: ['transparent'],
        },
        xaxis: {
          categories: data.map(x => x.month),
        },
        fill: {
          opacity: 1,
        },
        tooltip: {
          y: {
            formatter: (val: number) => `${val.toLocaleString()} ₺`,
          },
        },
        legend: {
          position: 'bottom',
        }
      };
    });
  }
}
