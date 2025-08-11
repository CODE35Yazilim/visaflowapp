import { Directive, OnInit, inject } from '@angular/core';

import { ListService, PermissionService, TrackByService } from '@abp/ng.core';

import type { SourceDto } from '../../../proxy/sources/models';
import { SourceViewService } from '../services/source.service';
import { SourceDetailViewService } from '../services/source-detail.service';

export const ChildTabDependencies = [];

export const ChildComponentDependencies = [];

@Directive()
export abstract class AbstractSourceComponent implements OnInit {
  public readonly list = inject(ListService);
  public readonly track = inject(TrackByService);
  public readonly service = inject(SourceViewService);
  public readonly serviceDetail = inject(SourceDetailViewService);
  public readonly permissionService = inject(PermissionService);

  protected title = '::Sources';
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

  update(record: SourceDto) {
    this.serviceDetail.update(record);
  }

  delete(record: SourceDto) {
    this.service.delete(record);
  }

  exportToExcel() {
    this.service.exportToExcel();
  }

  checkActionButtonVisibility() {
    if (this.isActionButtonVisible !== null) {
      return;
    }

    const canEdit = this.permissionService.getGrantedPolicy('VisaFlowApp.Sources.Edit');
    const canDelete = this.permissionService.getGrantedPolicy('VisaFlowApp.Sources.Delete');
    this.isActionButtonVisible = canEdit || canDelete;
  }
}
