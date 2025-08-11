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
import { PassportViewService } from '../services/passport-child.service';
import { PassportDetailViewService } from '../services/passport-child-detail.service';
import { PassportDetailModalComponent } from './passport-child-detail.component';
import { AbstractPassportComponent } from './passport-child.abstract.component';

@Component({
  selector: 'app-passport',
  imports: [
    NgbCollapseModule,
    NgbDatepickerModule,
    NgbDropdownModule,
    NgxValidateCoreModule,
    CoreModule,
    PageModule,
    ThemeSharedModule,
    PassportDetailModalComponent,
    CommercialUiModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    { provide: NgbDateAdapter, useClass: DateAdapter },
    ListService,
    PassportViewService,
    PassportDetailViewService,
  ],
  templateUrl: './passport-child.component.html',
})
export class PassportComponent extends AbstractPassportComponent {}
