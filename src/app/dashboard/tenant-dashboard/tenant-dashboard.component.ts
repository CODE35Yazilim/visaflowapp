import { Component, OnInit } from '@angular/core';
import { MainBoardReportDto } from '../../proxy/reports/models';
import { ReportService } from '../../proxy/reports/report.service';

@Component({
  standalone: false,
  selector: 'app-tenant-dashboard',
  templateUrl: './tenant-dashboard.component.html'
  
})
export class TenantDashboardComponent implements OnInit {
  reports: MainBoardReportDto[] = [];
  loading = true;

  constructor(private reportService: ReportService) {}

  ngOnInit() {
    this.reportService.getMainBoardReport().subscribe({
      next: (data) => {
        this.reports = data;
        this.loading = false;
      },
      error: () => { this.loading = false; }
    });
  }
}