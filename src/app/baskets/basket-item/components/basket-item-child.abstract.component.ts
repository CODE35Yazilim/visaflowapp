import { Directive, OnInit, inject, Input } from '@angular/core';
import { ListService, PermissionService, TrackByService } from '@abp/ng.core';

import type { BasketItemWithNavigationPropertiesDto } from '../../../proxy/basket-items/models';
import { BasketItemViewService } from '../services/basket-item-child.service';
import { BasketItemDetailViewService } from '../services/basket-item-child-detail.service';

@Directive()
export abstract class AbstractBasketItemComponent implements OnInit {
  public readonly list = inject(ListService);
  public readonly track = inject(TrackByService);
  public readonly service = inject(BasketItemViewService);
  public readonly serviceDetail = inject(BasketItemDetailViewService);
  public readonly permissionService = inject(PermissionService);

  protected isActionButtonVisible: boolean | null = null;

  @Input() title = '::BasketItems';
  @Input() basketId: string;

  ngOnInit() {
    this.serviceDetail.basketId = this.basketId;
    this.service.hookToQuery(this.basketId);
    this.checkActionButtonVisibility();
  }

  create() {
    this.serviceDetail.selected = undefined;
    this.serviceDetail.showForm();
  }

  update(record: BasketItemWithNavigationPropertiesDto) {
    this.serviceDetail.update(record);
  }

  delete(record: BasketItemWithNavigationPropertiesDto) {
    this.service.delete(record);
  }

  checkActionButtonVisibility() {
    if (this.isActionButtonVisible !== null) {
      return;
    }

    const canEdit = this.permissionService.getGrantedPolicy('VisaFlowApp.BasketItems.Edit');
    const canDelete = this.permissionService.getGrantedPolicy('VisaFlowApp.BasketItems.Delete');
    this.isActionButtonVisible = canEdit || canDelete;
  }
}
