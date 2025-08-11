import { AfterViewInit, Component, ViewChild, inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NgbDateAdapter, NgbDateNativeAdapter } from '@ng-bootstrap/ng-bootstrap';
import { AgencyReportWidgetComponent } from './widgets/agency-report-widget.component';

import { SupplierReportWidgetComponent } from '../agent/widgets/supplier-report-widget.component';
import { ProductSalesWidgetComponent } from '../agent/widgets/product-sales-widget.component';
import { PageModule } from '@abp/ng.components/page';
import { ChildTabDependencies } from 'src/app/customers/customer/components/customer.abstract.component';
import { ThemeSharedModule, DateAdapter, TimeAdapter } from '@abp/ng.theme.shared';
import { CommercialUiModule } from '@volo/abp.commercial.ng.ui';
import { ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from '@abp/ng.core';

@Component({
  selector: 'app-agent-reports',
  templateUrl: './agent-report.component.html',
imports: [
  ...ChildTabDependencies,
  CoreModule,
  ReactiveFormsModule,
  PageModule,
  ThemeSharedModule,
  CommercialUiModule,
  AgencyReportWidgetComponent,

  SupplierReportWidgetComponent,
ProductSalesWidgetComponent
],
  providers: [{ provide: NgbDateAdapter, useClass: NgbDateNativeAdapter }],
})
export class AgentReportsComponent implements AfterViewInit {
  fb = inject(FormBuilder);

  @ViewChild('agencyReportWidget', { static: false })
  agencyReportWidget: AgencyReportWidgetComponent;

  

  @ViewChild('supplierReportWidget', { static: false })
supplierReportWidget: SupplierReportWidgetComponent;

@ViewChild('productSalesWidget', { static: false })
productSalesWidget: ProductSalesWidgetComponent;


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

  this.agencyReportWidget?.draw({ startDate: startDateStr, endDate: endDateStr });
  

  this.supplierReportWidget?.draw({ startDate: startDateStr, endDate: endDateStr });
  this.productSalesWidget?.draw({ startDate: startDateStr, endDate: endDateStr });
  
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
