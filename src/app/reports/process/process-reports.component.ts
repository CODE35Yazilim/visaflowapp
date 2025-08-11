import { AfterViewInit, Component, ViewChild, inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NgbDateAdapter, NgbDateNativeAdapter } from '@ng-bootstrap/ng-bootstrap';
import { CountryReportWidgetComponent } from '../process/widgets/country-report-widget.component';
import { VisaTypeReportWidgetComponent } from '../process/widgets/visa-type-report-widget.component';
import { PageModule } from '@abp/ng.components/page';
import { ChildTabDependencies } from 'src/app/customers/customer/components/customer.abstract.component';
import { ThemeSharedModule } from '@abp/ng.theme.shared';
import { CommercialUiModule } from '@volo/abp.commercial.ng.ui';
import { ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from '@abp/ng.core';

import { ProcessingTimeWidgetComponent } from './widgets/processing-time-widget.component';
import { MonthlySummaryWidgetComponent } from './widgets/monthly-summary-widget.component';


@Component({
  selector: 'app-process-reports',
  templateUrl: './process-reports.component.html',
  standalone: true,
  imports: [
    ...ChildTabDependencies,
    PageModule,
    ThemeSharedModule,
    CommercialUiModule,
    ReactiveFormsModule,
    CoreModule,
    ProcessingTimeWidgetComponent,
    MonthlySummaryWidgetComponent,
      CountryReportWidgetComponent,
      VisaTypeReportWidgetComponent,
    
  ],
  providers: [{ provide: NgbDateAdapter, useClass: NgbDateNativeAdapter }],
})
export class ProcessReportsComponent implements AfterViewInit {
  fb = inject(FormBuilder);

  @ViewChild('processingTimeWidget', { static: false })
  processingTimeWidget: ProcessingTimeWidgetComponent;

  @ViewChild('monthlySummaryWidget', { static: false })
  monthlySummaryWidget: MonthlySummaryWidgetComponent;

    @ViewChild('countryReportWidget', { static: false })
    countryReportWidget: CountryReportWidgetComponent;
  
    @ViewChild('visaTypeReportWidget') visaTypeReportWidget: VisaTypeReportWidgetComponent;


  now = new Date();
  fromDate = new Date(this.now.getFullYear(), this.now.getMonth() - 1, this.now.getDate());

  formFilters = this.fb.group({
    times: [{ fromDate: this.fromDate, toDate: this.now }]
  });

  ngAfterViewInit(): void {
    this.refresh();
  }

  refresh(): void {
    const { fromDate, toDate } = this.formFilters.value.times;

  
const startDate = this.startOfDay(fromDate);
  const endDate = this.extendToEndOfDay(toDate);

  const startDateStr = this.toDateString(startDate);
  const endDateStr = this.toDateString(endDate);


  
    this.countryReportWidget?.draw({ startDate: startDateStr, endDate: endDateStr });
  this.visaTypeReportWidget?.draw({ startDate: startDateStr, endDate: endDateStr });

    this.processingTimeWidget?.draw({ startDate: startDateStr, endDate: endDateStr });
    // this.monthlySummaryWidget?.draw({ startDate: startDateStr, endDate: endDateStr });
    
  }

private startOfDay(date: Date): Date {
  const start = new Date(date);
  start.setHours(0, 0, 0, 0);
  return start;
}


private toDateString(date: Date): string {
  return date.toISOString();
}

private extendToEndOfDay(date: Date): Date {
  const endOfDay = new Date(date);
  endOfDay.setHours(23, 59, 59, 999);
  return endOfDay;
}
}
