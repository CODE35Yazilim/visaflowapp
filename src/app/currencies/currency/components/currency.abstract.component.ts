import { Directive, OnInit, inject } from '@angular/core';

import { ListService, PermissionService, TrackByService } from '@abp/ng.core';

import type { CurrencyDto } from '../../../proxy/currencies/models';
import { CurrencyViewService } from '../services/currency.service';
import { CurrencyDetailViewService } from '../services/currency-detail.service';

export const ChildTabDependencies = [];

export const ChildComponentDependencies = [];

@Directive()
export abstract class AbstractCurrencyComponent implements OnInit {
  public readonly list = inject(ListService);
  public readonly track = inject(TrackByService);
  public readonly service = inject(CurrencyViewService);
  public readonly serviceDetail = inject(CurrencyDetailViewService);
  public readonly permissionService = inject(PermissionService);

  protected title = '::Currencies';
  protected isActionButtonVisible: boolean | null = null;

  ngOnInit() {
    this.service.hookToQuery();
    this.checkActionButtonVisibility();
  }

  clearFilters() {
    this.service.clearFilters();
  }

  showForm() {
    this.serviceDetail.showForm();
  }

  create() {
    this.serviceDetail.selected = undefined;
    this.serviceDetail.showForm();
  }

  update(record: CurrencyDto) {
    this.serviceDetail.update(record);
  }

  delete(record: CurrencyDto) {
    this.service.delete(record);
  }

  exportToExcel() {
    this.service.exportToExcel();
  }

  checkActionButtonVisibility() {
    if (this.isActionButtonVisible !== null) {
      return;
    }

    const canEdit = this.permissionService.getGrantedPolicy('VisaFlowApp.Currencies.Edit');
    const canDelete = this.permissionService.getGrantedPolicy('VisaFlowApp.Currencies.Delete');
    this.isActionButtonVisible = canEdit || canDelete;
  }
}
