import { Directive, OnInit, inject, Input } from '@angular/core';
import { ListService, PermissionService, TrackByService } from '@abp/ng.core';

import { communicationTypeOptions } from '../../../proxy/customers/communication-type.enum';
import type { ContactInfoDto } from '../../../proxy/contact-infos/models';
import { ContactInfoViewService } from '../services/contact-info-child.service';
import { ContactInfoDetailViewService } from '../services/contact-info-child-detail.service';

@Directive()
export abstract class AbstractContactInfoComponent implements OnInit {
  public readonly list = inject(ListService);
  public readonly track = inject(TrackByService);
  public readonly service = inject(ContactInfoViewService);
  public readonly serviceDetail = inject(ContactInfoDetailViewService);
  public readonly permissionService = inject(PermissionService);

  protected isActionButtonVisible: boolean | null = null;

  @Input() title = '::ContactInfos';
  @Input() customerId: string;

  communicationTypeOptions = communicationTypeOptions;

  ngOnInit() {
    this.serviceDetail.customerId = this.customerId;
    this.service.hookToQuery(this.customerId);
    this.checkActionButtonVisibility();
  }

  create() {
    this.serviceDetail.selected = undefined;
    this.serviceDetail.showForm();
  }

  update(record: ContactInfoDto) {
    this.serviceDetail.update(record);
  }

  delete(record: ContactInfoDto) {
    this.service.delete(record);
  }

  checkActionButtonVisibility() {
    if (this.isActionButtonVisible !== null) {
      return;
    }

    const canEdit = this.permissionService.getGrantedPolicy('VisaFlowApp.ContactInfos.Edit');
    const canDelete = this.permissionService.getGrantedPolicy('VisaFlowApp.ContactInfos.Delete');
    this.isActionButtonVisible = canEdit || canDelete;
  }
}
