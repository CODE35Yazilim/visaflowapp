import { CoreModule } from '@abp/ng.core';
import { ThemeSharedModule, DateAdapter, TimeAdapter } from '@abp/ng.theme.shared';
import { CommercialUiModule } from '@volo/abp.commercial.ng.ui';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import {
  NgbNavModule,
  NgbDatepickerModule,
  NgbTimepickerModule,
  NgbDateAdapter,
  NgbTimeAdapter,
} from '@ng-bootstrap/ng-bootstrap';
import { ContactInfoDetailViewService } from '../services/contact-info-child-detail.service';

@Component({
  selector: 'app-contact-info-detail-modal',
  imports: [
    CoreModule,
    ThemeSharedModule,
    CommercialUiModule,
    ReactiveFormsModule,
    NgbDatepickerModule,
    NgbTimepickerModule,
    NgbNavModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    { provide: NgbDateAdapter, useClass: DateAdapter },
    { provide: NgbTimeAdapter, useClass: TimeAdapter },
  ],
  templateUrl: './contact-info-child-detail.component.html',
})
export class ContactInfoDetailModalComponent {
  public readonly service = inject(ContactInfoDetailViewService);
}
