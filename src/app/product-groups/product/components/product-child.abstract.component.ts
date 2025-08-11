import { Directive, OnInit, inject, Input } from '@angular/core';
import { ListService, PermissionService, TrackByService } from '@abp/ng.core';

import type { ProductDto } from '../../../proxy/products/models';
import { ProductViewService } from '../services/product-child.service';
import { ProductDetailViewService } from '../services/product-child-detail.service';

@Directive()
export abstract class AbstractProductComponent implements OnInit {
  public readonly list = inject(ListService);
  public readonly track = inject(TrackByService);
  public readonly service = inject(ProductViewService);
  public readonly serviceDetail = inject(ProductDetailViewService);
  public readonly permissionService = inject(PermissionService);

  protected isActionButtonVisible: boolean | null = null;

  @Input() title = '::Products';
  @Input() productGroupId: string;

  ngOnInit() {
    this.serviceDetail.productGroupId = this.productGroupId;
    this.service.hookToQuery(this.productGroupId);
    this.checkActionButtonVisibility();
  }

  create() {
    this.serviceDetail.selected = undefined;
    this.serviceDetail.showForm();
  }

  update(record: ProductDto) {
    this.serviceDetail.update(record);
  }

  delete(record: ProductDto) {
    this.service.delete(record);
  }

  checkActionButtonVisibility() {
    if (this.isActionButtonVisible !== null) {
      return;
    }

    const canEdit = this.permissionService.getGrantedPolicy('VisaFlowApp.Products.Edit');
    const canDelete = this.permissionService.getGrantedPolicy('VisaFlowApp.Products.Delete');
    this.isActionButtonVisible = canEdit || canDelete;
  }
}
