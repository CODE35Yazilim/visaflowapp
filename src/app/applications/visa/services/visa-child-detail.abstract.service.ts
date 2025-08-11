import { inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ListService, TrackByService } from '@abp/ng.core';

import { finalize, tap } from 'rxjs/operators';

import { visaStatusOptions } from '../../../proxy/visas/visa-status.enum';
import type { VisaDto } from '../../../proxy/visas/models';
import { VisaService } from '../../../proxy/visas/visa.service';

export abstract class AbstractVisaDetailViewService {
  protected readonly fb = inject(FormBuilder);
  protected readonly track = inject(TrackByService);

  public readonly proxyService = inject(VisaService);
  public readonly list = inject(ListService);

  visaStatusOptions = visaStatusOptions;

  applicationId: string;

  isBusy = false;
  isVisible = false;
  selected = {} as any;
  form: FormGroup | undefined;

  protected createRequest() {
    if (this.selected) {
      return this.proxyService.update(this.selected.id, this.form.value);
    }
    return this.proxyService.create(this.form.value);
  }

  buildForm() {
    const { startDate, validDate, visaStatus } = this.selected || {};

    this.form = this.fb.group({
      applicationId: [this.applicationId],
      startDate: [startDate ?? null, []],
      validDate: [validDate ?? null, []],
      visaStatus: [visaStatus ?? null, []],
    });
  }

  showForm() {
    this.buildForm();
    this.isVisible = true;
  }

  create() {
    this.selected = undefined;
    this.showForm();
  }

  update(record: VisaDto) {
    this.selected = record;
    this.showForm();
  }

  hideForm() {
    this.isVisible = false;
  }

  submitForm() {
    if (this.form.invalid) return;

    this.isBusy = true;

    const request = this.createRequest().pipe(
      finalize(() => (this.isBusy = false)),
      tap(() => this.hideForm()),
    );

    request.subscribe(this.list.get);
  }

  changeVisible(isVisible: boolean) {
    this.isVisible = isVisible;
  }
}
