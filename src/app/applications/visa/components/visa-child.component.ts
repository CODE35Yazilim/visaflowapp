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
import { VisaViewService } from '../services/visa-child.service';
import { VisaDetailViewService } from '../services/visa-child-detail.service';
import { VisaDetailModalComponent } from './visa-child-detail.component';
import { AbstractVisaComponent } from './visa-child.abstract.component';

@Component({
  selector: 'app-visa',
  imports: [
    NgbCollapseModule,
    NgbDatepickerModule,
    NgbDropdownModule,
    NgxValidateCoreModule,
    CoreModule,
    PageModule,
    ThemeSharedModule,
    VisaDetailModalComponent,
    CommercialUiModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    { provide: NgbDateAdapter, useClass: DateAdapter },
    ListService,
    VisaViewService,
    VisaDetailViewService,
  ],
  templateUrl: './visa-child.component.html',
})
export class VisaComponent extends AbstractVisaComponent {}
