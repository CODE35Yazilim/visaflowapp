import { Directive, OnInit, inject, ViewChild } from '@angular/core';
import { NgbNav, NgbNavItem, NgbNavLink, NgbNavContent, NgbNavOutlet } from '@ng-bootstrap/ng-bootstrap';
import { ListService, PermissionService, TrackByService } from '@abp/ng.core';
import type {
  BasketWithNavigationPropertiesDto,
  BasketPaymentUpdateDto
} from '../../../proxy/baskets/models';
import { BasketViewService } from '../services/basket.service';
import { BasketDetailViewService } from '../services/basket-detail.service';
import { BasketItemComponent } from '../../basket-item/components/basket-item-child.component';
import { TransactionDetailViewService } from '../../../transactions/transaction/services/transaction-detail.service';

export const ChildTabDependencies = [NgbNav, NgbNavItem, NgbNavLink, NgbNavContent, NgbNavOutlet];
export const ChildComponentDependencies = [BasketItemComponent];

@Directive()
export abstract class AbstractBasketComponent implements OnInit {
  public readonly list               = inject(ListService);
  public readonly track              = inject(TrackByService);
  public readonly service            = inject(BasketViewService);
  public readonly serviceDetail      = inject(BasketDetailViewService);
  public readonly permissionService  = inject(PermissionService);
  public readonly appTransactionsDetail = inject(TransactionDetailViewService);

  @ViewChild('basketTable') table: any;
  protected title = '::Baskets';
  protected isActionButtonVisible: boolean | null = null;
  protected isChildEntitiesPermitted: boolean | null = null;

  ngOnInit() {
    this.service.hookToQuery();
    this.checkActionButtonVisibility();
    this.checkChildEntityPermissions();
  }

  clearFilters()      { this.service.clearFilters(); }
  showForm()          { this.serviceDetail.showForm(); }
  create()            { this.serviceDetail.selected = undefined; this.serviceDetail.showForm(); }
  delete(r: BasketWithNavigationPropertiesDto) { this.service.delete(r); }
  exportToExcel()     { this.service.exportToExcel(); }
  paymentUpdate(r: BasketPaymentUpdateDto) { this.serviceDetail.paymentUpdate(r); }
  toggleExpandRow(r: any)           { this.table.rowDetail.toggleExpandRow(r); }

  /** Called from template’s “AddCollection” button */
  // onComplete(row: BasketWithNavigationPropertiesDto) {
  //   this.appTransactionsDetail.basketId = row.basket.id;
  //   this.appTransactionsDetail.selected = undefined;
  //   this.appTransactionsDetail.showForm();
  // }

  // addCollection butonu
public openAddCollection(basketId: string) {
  this.appTransactionsDetail.addCollection(basketId);
}
public openAddCost(basketId: string) {
  this.appTransactionsDetail.addCost(basketId);
}
  // convert butonu


  private checkChildEntityPermissions() {
    if (this.isChildEntitiesPermitted !== null) return;
    this.isChildEntitiesPermitted = ['VisaFlowApp.BasketItems']
      .some(p => this.permissionService.getGrantedPolicy(p));
  }

  private checkActionButtonVisibility() {
    if (this.isActionButtonVisible !== null) return;
    const canEdit   = this.permissionService.getGrantedPolicy('VisaFlowApp.Baskets.Edit');
    const canDelete = this.permissionService.getGrantedPolicy('VisaFlowApp.Baskets.Delete');
    this.isActionButtonVisible = canEdit || canDelete;
  }
}
