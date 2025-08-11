import { Component, Input, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeSharedModule } from '@abp/ng.theme.shared';
import { ReportService } from '../../../proxy/reports/report.service';
import { DashboardSummaryDto } from '../../../proxy/reports/models';

@Component({
  standalone: true,
  selector: 'app-summary-widget',
  templateUrl: './summary-widget.component.html',
  imports: [CommonModule, ThemeSharedModule], // ✅ zorunlu
})
export class SummaryWidgetComponent {
  @Input() height = 300;
  summary: DashboardSummaryDto | null = null;

  constructor(private reportService: ReportService, private cdr: ChangeDetectorRef) {}

  draw() {
  console.log('API çağrılıyor...');
  this.reportService.getDashboardSummary().subscribe(data => {
    console.log('API verisi:', data);
    this.summary = data;
    this.cdr.detectChanges();
  });
}

}
