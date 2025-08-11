import { Directive, OnInit, inject, ViewChild } from '@angular/core';
import {
  NgbNav,
  NgbNavItem,
  NgbNavLink,
  NgbNavContent,
  NgbNavOutlet,
} from '@ng-bootstrap/ng-bootstrap';
import { ListService, PermissionService, TrackByService } from '@abp/ng.core';

import { customerSexOptions } from '../../../proxy/customers/customer-sex.enum';
import type { CustomerDto } from '../../../proxy/customers/models';
import { CustomerViewService } from '../services/customer.service';
import { CustomerDetailViewService } from '../services/customer-detail.service';
import { PassportComponent } from '../../passport/components/passport-child.component';
import { ContactInfoComponent } from '../../contact-info/components/contact-info-child.component';

export const ChildTabDependencies = [
  NgbNav,
  NgbNavItem,
  NgbNavLink,
  NgbNavContent,
  NgbNavOutlet,
];
export const ChildComponentDependencies = [PassportComponent, ContactInfoComponent];

@Directive()
export abstract class AbstractCustomerComponent implements OnInit {
  public readonly list = inject(ListService);
  public readonly track = inject(TrackByService);
  public readonly service = inject(CustomerViewService);
  public readonly serviceDetail = inject(CustomerDetailViewService);
  public readonly permissionService = inject(PermissionService);

  protected title = '::Customers';
  protected isActionButtonVisible: boolean | null = null;
  protected isChildEntitiesPermitted: boolean | null = null;

  customerSexOptions = customerSexOptions;

  @ViewChild('customerTable') table: any;

  ngOnInit() {
    this.service.hookToQuery();
    this.checkActionButtonVisibility();
    this.checkChildEntityPermissions();
  }

  clearFilters() {
    this.service.clearFilters();
  }

  showForm() {
    this.serviceDetail.showForm();
  }

  create() {
    this.serviceDetail.create();
  }

  delete(record: CustomerDto) {
    this.service.delete(record);
  }

  exportToExcel() {
    this.service.exportToExcel();
  }

  toggleExpandRow(row: any) {
    this.table.rowDetail.toggleExpandRow(row);
  }

  private checkChildEntityPermissions() {
    if (this.isChildEntitiesPermitted !== null) {
      return;
    }

    const childPermissions = ['VisaFlowApp.Passports', 'VisaFlowApp.ContactInfos'];
    this.isChildEntitiesPermitted = childPermissions.some((permission) =>
      this.permissionService.getGrantedPolicy(permission)
    );
  }

  private checkActionButtonVisibility() {
    if (this.isActionButtonVisible !== null) {
      return;
    }

    const canEdit = this.permissionService.getGrantedPolicy(
      'VisaFlowApp.Customers.Edit'
    );
    const canDelete = this.permissionService.getGrantedPolicy(
      'VisaFlowApp.Customers.Delete'
    );
    this.isActionButtonVisible = canEdit || canDelete;
  }
}
