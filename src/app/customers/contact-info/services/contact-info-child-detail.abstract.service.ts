import { inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ListService, TrackByService } from '@abp/ng.core';

import { finalize, tap } from 'rxjs/operators';

import { communicationTypeOptions } from '../../../proxy/customers/communication-type.enum';
import type { ContactInfoDto } from '../../../proxy/contact-infos/models';
import { ContactInfoService } from '../../../proxy/contact-infos/contact-info.service';

export abstract class AbstractContactInfoDetailViewService {
  protected readonly fb = inject(FormBuilder);
  protected readonly track = inject(TrackByService);

  public readonly proxyService = inject(ContactInfoService);
  public readonly list = inject(ListService);

  communicationTypeOptions = communicationTypeOptions;

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
    const { type, name } = this.selected || {};

    this.form = this.fb.group({
      customerId: [this.customerId],
      type: [type ?? null, [Validators.required]],
      name: [name ?? null, [Validators.required]],
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

  update(record: ContactInfoDto) {
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
