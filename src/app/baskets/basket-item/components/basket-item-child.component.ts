import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  NgbDateAdapter,
  NgbCollapseModule,
  NgbDatepickerModule,
  NgbDropdownModule,
} from '@ng-bootstrap/ng-bootstrap';
import { NgxValidateCoreModule } from '@ngx-validate/core';
import { ListService, CoreModule } from '@abp/ng.core';
import { PageModule } from '@abp/ng.components/page';
import { ThemeSharedModule, DateAdapter } from '@abp/ng.theme.shared';
import { CommercialUiModule } from '@volo/abp.commercial.ng.ui';
import { BasketItemViewService } from '../services/basket-item-child.service';
import { BasketItemDetailViewService } from '../services/basket-item-child-detail.service';
import { BasketItemDetailModalComponent } from './basket-item-child-detail.component';
import { AbstractBasketItemComponent } from './basket-item-child.abstract.component';

@Component({
  selector: 'app-basket-item',
  imports: [
    NgbCollapseModule,
    NgbDatepickerModule,
    NgbDropdownModule,
    NgxValidateCoreModule,
    CoreModule,
    PageModule,
    ThemeSharedModule,
    BasketItemDetailModalComponent,
    CommercialUiModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    { provide: NgbDateAdapter, useClass: DateAdapter },
    ListService,
    BasketItemViewService,
    BasketItemDetailViewService,
  ],
  templateUrl: './basket-item-child.component.html',
})
export class BasketItemComponent extends AbstractBasketItemComponent {}
