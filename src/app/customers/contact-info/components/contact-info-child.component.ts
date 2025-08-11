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
import { ContactInfoViewService } from '../services/contact-info-child.service';
import { ContactInfoDetailViewService } from '../services/contact-info-child-detail.service';
import { ContactInfoDetailModalComponent } from './contact-info-child-detail.component';
import { AbstractContactInfoComponent } from './contact-info-child.abstract.component';

@Component({
  selector: 'app-contact-info',
  imports: [
    NgbCollapseModule,
    NgbDatepickerModule,
    NgbDropdownModule,
    NgxValidateCoreModule,
    CoreModule,
    PageModule,
    ThemeSharedModule,
    ContactInfoDetailModalComponent,
    CommercialUiModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    { provide: NgbDateAdapter, useClass: DateAdapter },
    ListService,
    ContactInfoViewService,
    ContactInfoDetailViewService,
  ],
  templateUrl: './contact-info-child.component.html',
})
export class ContactInfoComponent extends AbstractContactInfoComponent {}
