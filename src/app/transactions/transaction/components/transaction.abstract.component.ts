import { Directive, OnInit, inject } from '@angular/core';

import { ListService, PermissionService, TrackByService } from '@abp/ng.core';

import { paymentTypeOptions } from '../../../proxy/transactions/payment-type.enum';
import type { TransactionWithNavigationPropertiesDto } from '../../../proxy/transactions/models';
import { TransactionViewService } from '../services/transaction.service';
import { TransactionDetailViewService } from '../services/transaction-detail.service';

export const ChildTabDependencies = [];

export const ChildComponentDependencies = [];

@Directive()
export abstract class AbstractTransactionComponent implements OnInit {
  public readonly list = inject(ListService);
  public readonly track = inject(TrackByService);
  public readonly service = inject(TransactionViewService);
  public readonly serviceDetail = inject(TransactionDetailViewService);
  public readonly permissionService = inject(PermissionService);

  protected title = '::Transactions';
  protected isActionButtonVisible: boolean | null = null;

  paymentTypeOptions = paymentTypeOptions;

  ngOnInit() {
    this.service.hookToQuery();
    this.checkActionButtonVisibility();
  }

  clearFilters() {
    this.service.clearFilters();
  }

  // showForm() {
  //   this.serviceDetail.showForm();
  // }

  // create() {
  //   this.serviceDetail.selected = undefined;
  //   this.serviceDetail.showForm();
  // }

  // update(record: TransactionWithNavigationPropertiesDto) {
  //   this.serviceDetail.update(record);
  // }

  public openCurrencyConvert() {
  this.serviceDetail.currencyConvert();
}


  delete(record: TransactionWithNavigationPropertiesDto) {
    this.service.delete(record);
  }

  exportToExcel() {
    this.service.exportToExcel();
  }

  checkActionButtonVisibility() {
    if (this.isActionButtonVisible !== null) {
      return;
    }

    const canEdit = this.permissionService.getGrantedPolicy('VisaFlowApp.Transactions.Edit');
    const canDelete = this.permissionService.getGrantedPolicy('VisaFlowApp.Transactions.Delete');
    this.isActionButtonVisible = canEdit || canDelete;
  }
}
