import { Directive, OnInit, inject, ViewChild } from '@angular/core';

import {
  NgbNav,
  NgbNavItem,
  NgbNavLink,
  NgbNavContent,
  NgbNavOutlet,
} from '@ng-bootstrap/ng-bootstrap';
import { ListService, PermissionService, TrackByService } from '@abp/ng.core';

import { applicationStatusOptions } from '../../../proxy/applications/application-status.enum';
import { ApplicationService } from '../../../proxy/applications/application.service';
import type { ApplicationWithNavigationPropertiesDto } from '../../../proxy/applications/models';
import { ApplicationViewService } from '../services/application.service';
import { ApplicationDetailViewService } from '../services/application-detail.service';
import { VisaComponent } from '../../visa/components/visa-child.component';
import { VisaDetailViewService } from '../../visa/services/visa-child-detail.service';

export const ChildTabDependencies = [NgbNav, NgbNavItem, NgbNavLink, NgbNavContent, NgbNavOutlet];

export const ChildComponentDependencies = [VisaComponent];

@Directive()
export abstract class AbstractApplicationComponent implements OnInit {
  public readonly list = inject(ListService);
  public readonly track = inject(TrackByService);
  public readonly service = inject(ApplicationViewService);
  public readonly serviceDetail = inject(ApplicationDetailViewService);
  public readonly permissionService = inject(PermissionService);
  public readonly appVisasDetail = inject(VisaDetailViewService);
  public readonly proxyService = inject(ApplicationService);

  protected title = '::Applications';
  protected isActionButtonVisible: boolean | null = null;
  protected isChildEntitiesPermitted: boolean | null = null;

  applicationStatusOptions = applicationStatusOptions;

  @ViewChild('applicationTable') table: any;

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

  update(record: ApplicationWithNavigationPropertiesDto) {
    this.serviceDetail.update(record);
  }

 updateReservation(record: ApplicationWithNavigationPropertiesDto) {
  this.serviceDetail.openReservation(record); 
}


  delete(record: ApplicationWithNavigationPropertiesDto) {
    this.service.delete(record);
  }

  exportToExcel() {
    this.service.exportToExcel();
  }

  toggleExpandRow(row) {
    this.table.rowDetail.toggleExpandRow(row);
  }

  checkChildEntityPermissions() {
    if (this.isChildEntitiesPermitted !== null) {
      return;
    }

    const childPermissions = ['VisaFlowApp.Visas'];
    this.isChildEntitiesPermitted = childPermissions.some(permission =>
      this.permissionService.getGrantedPolicy(permission),
    );
  }

  checkActionButtonVisibility() {
    if (this.isActionButtonVisible !== null) {
      return;
    }

    const canEdit = this.permissionService.getGrantedPolicy('VisaFlowApp.Applications.Edit');
    const canDelete = this.permissionService.getGrantedPolicy('VisaFlowApp.Applications.Delete');
    this.isActionButtonVisible = canEdit || canDelete;
  }

  public onComplete(row: ApplicationWithNavigationPropertiesDto) {
  // 1) Önce backend'deki complete servisini çağırıyoruz
  this.proxyService
    .complete(row.application.id)
    .subscribe(() => {
      // 2) Tamamlandıktan sonra Visa modalını açıyoruz
      this.appVisasDetail.applicationId = row.application.id;
      this.appVisasDetail.selected = undefined;
      this.appVisasDetail.showForm();
    });
}


  public addAppVisas(row: ApplicationWithNavigationPropertiesDto) {
  
    
    
  this.appVisasDetail.applicationId = row.application.id;
  
  // Servisteki state’i sıfırla (zorunlu değil ama akışı sade tutar)
  this.appVisasDetail.selected = undefined;
    

  // Modal açılırken buildForm() içinde applicationId set edilir,
  // mevcut kayıt varsa update, yoksa create akışı çalışır (servis içinde zaten yönetiliyor)
  this.appVisasDetail.showForm();
}

}
