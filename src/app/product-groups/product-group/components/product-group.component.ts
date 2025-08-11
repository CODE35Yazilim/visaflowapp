import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  NgbDateAdapter,
  NgbTimeAdapter,
  NgbCollapseModule,
  NgbDatepickerModule,
  NgbTimepickerModule,
  NgbDropdownModule,
} from '@ng-bootstrap/ng-bootstrap';
import { NgxValidateCoreModule } from '@ngx-validate/core';
import { ListService, CoreModule } from '@abp/ng.core';
import { ThemeSharedModule, DateAdapter, TimeAdapter } from '@abp/ng.theme.shared';
import { PageModule } from '@abp/ng.components/page';
import { CommercialUiModule } from '@volo/abp.commercial.ng.ui';
import { ProductGroupViewService } from '../services/product-group.service';
import { ProductGroupDetailViewService } from '../services/product-group-detail.service';
import { ProductGroupDetailModalComponent } from './product-group-detail.component';
import {
  AbstractProductGroupComponent,
  ChildTabDependencies,
  ChildComponentDependencies,
} from './product-group.abstract.component';

@Component({
  selector: 'app-product-group',
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
    ProductGroupDetailModalComponent,
    ...ChildComponentDependencies,
  ],
  providers: [
    ListService,
    ProductGroupViewService,
    ProductGroupDetailViewService,
    { provide: NgbDateAdapter, useClass: DateAdapter },
    { provide: NgbTimeAdapter, useClass: TimeAdapter },
  ],
  templateUrl: './product-group.component.html',
  styles: `
    ::ng-deep.datatable-row-detail {
      background: transparent !important;
    }
  `,
})
export class ProductGroupComponent extends AbstractProductGroupComponent {}
