import { AfterViewInit, Component, ViewChild, inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NgbDateAdapter, NgbDateNativeAdapter } from '@ng-bootstrap/ng-bootstrap';
import { MonthlyFinanceOverviewWidgetComponent } from './widgets/monthly-finance-overview-widget.component';
import { FinancePieChartWidgetComponent } from './widgets/finance-pie-chart-widget.component';

import { PageModule } from '@abp/ng.components/page';
import { ChildTabDependencies } from 'src/app/customers/customer/components/customer.abstract.component';
import { ThemeSharedModule, DateAdapter, TimeAdapter } from '@abp/ng.theme.shared';
import { CommercialUiModule } from '@volo/abp.commercial.ng.ui';
import { ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from '@abp/ng.core';

@Component({
  selector: 'app-finance-reports',
  templateUrl: './finance-reports.component.html',
  imports:[...ChildTabDependencies,PageModule,
    ThemeSharedModule,
    CommercialUiModule,
    ReactiveFormsModule,
    CoreModule,
    MonthlyFinanceOverviewWidgetComponent,
    FinancePieChartWidgetComponent],
  providers: [{ provide: NgbDateAdapter, useClass: NgbDateNativeAdapter }],
})
export class FinanceReportsComponent implements AfterViewInit {
  fb = inject(FormBuilder);

  @ViewChild('monthlyFinanceOverviewWidget', { static: false })
  monthlyFinanceOverviewWidget: MonthlyFinanceOverviewWidgetComponent;

  @ViewChild('financePieChartWidget', { static: false })
financePieChartWidget: FinancePieChartWidgetComponent;






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

  this.monthlyFinanceOverviewWidget?.draw({ startDate: startDateStr, endDate: endDateStr });
  this.financePieChartWidget?.draw({ startDate: startDateStr, endDate: endDateStr });

  
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
