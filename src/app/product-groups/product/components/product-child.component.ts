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
import { ProductViewService } from '../services/product-child.service';
import { ProductDetailViewService } from '../services/product-child-detail.service';
import { ProductDetailModalComponent } from './product-child-detail.component';
import { AbstractProductComponent } from './product-child.abstract.component';

@Component({
  selector: 'app-product',
  imports: [
    NgbCollapseModule,
    NgbDatepickerModule,
    NgbDropdownModule,
    NgxValidateCoreModule,
    CoreModule,
    PageModule,
    ThemeSharedModule,
    ProductDetailModalComponent,
    CommercialUiModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    { provide: NgbDateAdapter, useClass: DateAdapter },
    ListService,
    ProductViewService,
    ProductDetailViewService,
  ],
  templateUrl: './product-child.component.html',
})
export class ProductComponent extends AbstractProductComponent {}
