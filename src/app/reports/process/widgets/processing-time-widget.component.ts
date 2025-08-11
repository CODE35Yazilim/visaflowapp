import { Component, Input,ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeSharedModule } from '@abp/ng.theme.shared'; 
import { ReportService } from '../../../proxy/reports/report.service';
import { ApplicationProcessingTimeDto } from '../../../proxy/reports/models';



@Component({
  standalone: true,
  selector: 'app-processing-time-widget',
  templateUrl: './processing-time-widget.component.html',
  imports: [CommonModule, ThemeSharedModule], 
})
export class ProcessingTimeWidgetComponent {
  @Input() height = 200;
  data?: ApplicationProcessingTimeDto;

  constructor(
  private reportService: ReportService,
  private cdr: ChangeDetectorRef
) {}

  draw({ startDate, endDate }: { startDate: string; endDate: string }) {
    this.reportService.getApplicationProcessingTime(startDate, endDate).subscribe((res) => {
      this.data = res;
      this.cdr.detectChanges();
    });

  }
}
