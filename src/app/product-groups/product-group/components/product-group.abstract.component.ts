import { Directive, OnInit, inject, ViewChild } from '@angular/core';

import {
  NgbNav,
  NgbNavItem,
  NgbNavLink,
  NgbNavContent,
  NgbNavOutlet,
} from '@ng-bootstrap/ng-bootstrap';
import { ListService, PermissionService, TrackByService } from '@abp/ng.core';

import type { ProductGroupDto } from '../../../proxy/product-groups/models';
import { ProductGroupViewService } from '../services/product-group.service';
import { ProductGroupDetailViewService } from '../services/product-group-detail.service';
import { ProductComponent } from '../../product/components/product-child.component';

export const ChildTabDependencies = [NgbNav, NgbNavItem, NgbNavLink, NgbNavContent, NgbNavOutlet];

export const ChildComponentDependencies = [ProductComponent];

@Directive()
export abstract class AbstractProductGroupComponent implements OnInit {
  public readonly list = inject(ListService);
  public readonly track = inject(TrackByService);
  public readonly service = inject(ProductGroupViewService);
  public readonly serviceDetail = inject(ProductGroupDetailViewService);
  public readonly permissionService = inject(PermissionService);

  protected title = '::ProductGroups';
  protected isActionButtonVisible: boolean | null = null;
  protected isChildEntitiesPermitted: boolean | null = null;

  @ViewChild('productGroupTable') table: any;

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
    this.serviceDetail.selected = undefined;
    this.serviceDetail.showForm();
  }

  update(record: ProductGroupDto) {
    this.serviceDetail.update(record);
  }

  delete(record: ProductGroupDto) {
    this.service.delete(record);
  }

  toggleExpandRow(row) {
    this.table.rowDetail.toggleExpandRow(row);
  }

  checkChildEntityPermissions() {
    if (this.isChildEntitiesPermitted !== null) {
      return;
    }

    const childPermissions = ['VisaFlowApp.Products'];
    this.isChildEntitiesPermitted = childPermissions.some(permission =>
      this.permissionService.getGrantedPolicy(permission),
    );
  }

  checkActionButtonVisibility() {
    if (this.isActionButtonVisible !== null) {
      return;
    }

    const canEdit = this.permissionService.getGrantedPolicy('VisaFlowApp.ProductGroups.Edit');
    const canDelete = this.permissionService.getGrantedPolicy('VisaFlowApp.ProductGroups.Delete');
    this.isActionButtonVisible = canEdit || canDelete;
  }
}
