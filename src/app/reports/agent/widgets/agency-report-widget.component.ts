import { Component, Input, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgApexchartsModule } from 'ng-apexcharts';
import {
  ApexChart,
  ApexXAxis,
  ApexYAxis,
  ApexTitleSubtitle,
  ApexLegend,
  ApexDataLabels,
  ApexStroke,
  ApexPlotOptions,
  ApexResponsive,
  ApexFill,
  ApexTooltip,
  ApexAxisChartSeries
} from 'ng-apexcharts';
import { ReportService } from '../../../proxy/reports/report.service';
import { AgencyApplicationStatsDto } from '../../../proxy/reports/models';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  yaxis?: ApexYAxis;
  title?: ApexTitleSubtitle;
  legend?: ApexLegend;
  dataLabels?: ApexDataLabels;
  stroke?: ApexStroke;
  fill?: ApexFill;
  tooltip?: ApexTooltip;
  plotOptions?: ApexPlotOptions;
  responsive?: ApexResponsive[];
};

@Component({
  standalone: true,
  selector: 'app-agency-report-widget',
  templateUrl: './agency-report-widget.component.html',
  imports: [CommonModule, NgApexchartsModule],
})
export class AgencyReportWidgetComponent {
  @Input() height = 300;

  chartOptions: Partial<ChartOptions> = {};
  tableData: AgencyApplicationStatsDto[] = [];

  constructor(private reportService: ReportService, private cdr: ChangeDetectorRef) {}

  draw({ startDate, endDate }: { startDate: string; endDate: string }) {
    this.reportService.getAgencyApplicationStats(startDate, endDate).subscribe(data => {
      this.chartOptions = {
        series: [
          {
            name: 'Toplam Başvuru',
            data: data.map(x => x.totalApplications),
          }
        ],
        chart: {
          type: 'bar',
          height: this.height
        },
        xaxis: {
          categories: data.map(x => x.agencyName)
        },
        tooltip: {
          y: {
            formatter: val => `${val} başvuru`
          }
        },
        dataLabels: {
          enabled: true
        },
        legend: {
          position: 'top'
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: '50%'
          }
        }
      };

      this.tableData = data;
      this.cdr.detectChanges();
    });
  }
}
