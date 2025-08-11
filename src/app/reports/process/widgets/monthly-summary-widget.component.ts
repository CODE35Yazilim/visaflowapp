import { Component, Input } from '@angular/core';
import {
  Chart,
  LineController,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  ChartConfiguration
} from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { ReportService } from '../../../proxy/reports/report.service';
import { DailySummaryDto } from '../../../proxy/reports/models';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-monthly-summary-widget',
  templateUrl: './monthly-summary-widget.component.html',
  imports: [CommonModule,BaseChartDirective],
})
export class MonthlySummaryWidgetComponent {
  @Input() height = 300;
  chartData: ChartConfiguration<'line'>['data'] = { labels: [], datasets: [] };
  tableData: DailySummaryDto[] = [];

  constructor(private reportService: ReportService) {
    Chart.register(LineController, LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend);
  }

  draw({ startDate, endDate }: { startDate: string; endDate: string }) {
    this.reportService.getMonthlySummary(startDate, endDate).subscribe((data) => {
      this.tableData = data;
      this.chartData = {
        labels: data.map(x => x.date),
        datasets: [
          {
            label: 'Yeni Kullanıcılar',
            data: data.map(x => x.newUsers),
            borderColor: '#4caf50',
            fill: false,
            tension: 0.3
          },
          {
            label: 'Yeni Başvurular',
            data: data.map(x => x.newApplications),
            borderColor: '#2196f3',
            fill: false,
            tension: 0.3
          },
          {
            label: 'Yeni Ödemeler',
            data: data.map(x => x.newPayments),
            borderColor: '#ff9800',
            fill: false,
            tension: 0.3
          }
        ]
      };
    });
  }
}
