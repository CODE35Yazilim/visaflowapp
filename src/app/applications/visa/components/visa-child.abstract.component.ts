import { Directive, OnInit, inject, Input } from '@angular/core';
import { ListService, PermissionService, TrackByService } from '@abp/ng.core';

import { visaStatusOptions } from '../../../proxy/visas/visa-status.enum';
import type { VisaDto } from '../../../proxy/visas/models';
import { VisaViewService } from '../services/visa-child.service';
import { VisaDetailViewService } from '../services/visa-child-detail.service';

@Directive()
export abstract class AbstractVisaComponent implements OnInit {
  public readonly list = inject(ListService);
  public readonly track = inject(TrackByService);
  public readonly service = inject(VisaViewService);
  public readonly serviceDetail = inject(VisaDetailViewService);
  public readonly permissionService = inject(PermissionService);

  protected isActionButtonVisible: boolean | null = null;

  @Input() title = '::Visas';
  @Input() applicationId: string;

  visaStatusOptions = visaStatusOptions;

  ngOnInit() {
    this.serviceDetail.applicationId = this.applicationId;
    this.service.hookToQuery(this.applicationId);
    this.checkActionButtonVisibility();
  }

  create() {
    this.serviceDetail.selected = undefined;
    this.serviceDetail.showForm();
  }

  update(record: VisaDto) {
    this.serviceDetail.update(record);
  }

  delete(record: VisaDto) {
    this.service.delete(record);
  }

  checkActionButtonVisibility() {
    if (this.isActionButtonVisible !== null) {
      return;
    }

    const canEdit = this.permissionService.getGrantedPolicy('VisaFlowApp.Visas.Edit');
    const canDelete = this.permissionService.getGrantedPolicy('VisaFlowApp.Visas.Delete');
    this.isActionButtonVisible = canEdit || canDelete;
  }
}
