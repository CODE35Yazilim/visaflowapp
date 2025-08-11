import { Directive, OnInit, inject, Input } from '@angular/core';
import { ListService, PermissionService, TrackByService } from '@abp/ng.core';

import type { PassportDto } from '../../../proxy/passports/models';
import { PassportViewService } from '../services/passport-child.service';
import { PassportDetailViewService } from '../services/passport-child-detail.service';

@Directive()
export abstract class AbstractPassportComponent implements OnInit {
  public readonly list = inject(ListService);
  public readonly track = inject(TrackByService);
  public readonly service = inject(PassportViewService);
  public readonly serviceDetail = inject(PassportDetailViewService);
  public readonly permissionService = inject(PermissionService);

  protected isActionButtonVisible: boolean | null = null;

  @Input() title = '::Passports';
  @Input() customerId: string;

  ngOnInit() {
    this.serviceDetail.customerId = this.customerId;
    this.service.hookToQuery(this.customerId);
    this.checkActionButtonVisibility();
  }

  create() {
    this.serviceDetail.selected = undefined;
    this.serviceDetail.showForm();
  }

  update(record: PassportDto) {
    this.serviceDetail.update(record);
  }

  delete(record: PassportDto) {
    this.service.delete(record);
  }

  checkActionButtonVisibility() {
    if (this.isActionButtonVisible !== null) {
      return;
    }

    const canEdit = this.permissionService.getGrantedPolicy('VisaFlowApp.Passports.Edit');
    const canDelete = this.permissionService.getGrantedPolicy('VisaFlowApp.Passports.Delete');
    this.isActionButtonVisible = canEdit || canDelete;
  }
}
