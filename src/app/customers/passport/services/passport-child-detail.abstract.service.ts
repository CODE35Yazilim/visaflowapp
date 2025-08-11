import { inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ListService, TrackByService } from '@abp/ng.core';

import { finalize, tap } from 'rxjs/operators';

import type { PassportDto } from '../../../proxy/passports/models';
import { PassportService } from '../../../proxy/passports/passport.service';

export abstract class AbstractPassportDetailViewService {
  protected readonly fb = inject(FormBuilder);
  protected readonly track = inject(TrackByService);

  public readonly proxyService = inject(PassportService);
  public readonly list = inject(ListService);

  customerId: string;

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
    const { number, isMain, startDate, validDate, issuedBy, state } = this.selected || {};

    this.form = this.fb.group({
      customerId: [this.customerId],
      number: [number ?? null, [Validators.required]],
      isMain: [isMain ?? true, []],
      startDate: [startDate ?? null, []],
      validDate: [validDate ?? null, []],
      issuedBy: [issuedBy ?? null, [Validators.required]],
      state: [state ?? null, [Validators.required]],
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

  update(record: PassportDto) {
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
