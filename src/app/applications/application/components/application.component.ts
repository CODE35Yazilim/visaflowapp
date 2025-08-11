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
import { ApplicationViewService } from '../services/application.service';
import { ApplicationDetailViewService } from '../services/application-detail.service';
import { ApplicationDetailModalComponent } from './application-detail.component';

import { VisaDetailViewService } from '../../visa/services/visa-child-detail.service';
import { VisaDetailModalComponent } from '../../visa/components/visa-child-detail.component';

import {
  AbstractApplicationComponent,
  ChildTabDependencies,
  ChildComponentDependencies,
} from './application.abstract.component';

@Component({
  selector: 'app-application',
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
    VisaDetailModalComponent,
    ApplicationDetailModalComponent,
    ...ChildComponentDependencies,
  ],
  providers: [
    ListService,
    ApplicationViewService,
    ApplicationDetailViewService,
    VisaDetailViewService,
    { provide: NgbDateAdapter, useClass: DateAdapter },
    { provide: NgbTimeAdapter, useClass: TimeAdapter },
  ],
  templateUrl: './application.component.html',
  styles: `
    ::ng-deep.datatable-row-detail {
      background: transparent !important;
    }
  `,
})
export class ApplicationComponent extends AbstractApplicationComponent {}
