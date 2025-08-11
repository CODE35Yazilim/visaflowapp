import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { NgbDateAdapter, NgbTimeAdapter, NgbCollapseModule, NgbDatepickerModule, NgbTimepickerModule, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxValidateCoreModule } from '@ngx-validate/core';
import { ListService, CoreModule } from '@abp/ng.core';
import { PageModule } from '@abp/ng.components/page';
import { ThemeSharedModule, DateAdapter, TimeAdapter } from '@abp/ng.theme.shared';
import { CommercialUiModule } from '@volo/abp.commercial.ng.ui';

import { BasketViewService } from '../services/basket.service';
import { BasketDetailViewService } from '../services/basket-detail.service';
import { BasketDetailModalComponent } from './basket-detail.component';

// transaction-detail modal & service
import { TransactionDetailModalComponent } from '../../../transactions/transaction/components/transaction-detail.component';
import { TransactionDetailViewService } from '../../../transactions/transaction/services/transaction-detail.service';

import { AbstractBasketComponent, ChildTabDependencies, ChildComponentDependencies } from './basket.abstract.component';

@Component({
  selector: 'app-basket',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.Default,
  imports: [
    ...ChildTabDependencies,
    NgbCollapseModule,
    NgbDatepickerModule,
    NgbTimepickerModule,
    NgbDropdownModule,
    NgxValidateCoreModule,
    PageModule,
    CoreModule,
    ThemeSharedModule,
    CommercialUiModule,

    // both modals:
    BasketDetailModalComponent,
    TransactionDetailModalComponent,

    ...ChildComponentDependencies,
  ],
  providers: [
    ListService,
    BasketViewService,
    BasketDetailViewService,
    TransactionDetailViewService,   // ← ensure this is here
    { provide: NgbDateAdapter, useClass: DateAdapter },
    { provide: NgbTimeAdapter, useClass: TimeAdapter },
  ],
  templateUrl: './basket.component.html',
  styles: [ `::ng-deep.datatable-row-detail { background: transparent !important; }` ],
})
export class BasketComponent extends AbstractBasketComponent {
  // all logic lives in AbstractBasketComponent
}
