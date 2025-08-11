import { inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ListService, TrackByService } from '@abp/ng.core';

import { finalize, tap } from 'rxjs/operators';

import type { SourceDto } from '../../../proxy/sources/models';
import { SourceService } from '../../../proxy/sources/source.service';

export abstract class AbstractSourceDetailViewService {
  protected readonly fb = inject(FormBuilder);
  protected readonly track = inject(TrackByService);

  public readonly proxyService = inject(SourceService);
  public readonly list = inject(ListService);

  isBusy = false;
  isVisible = false;
  selected = {} as any;
  form: FormGroup | undefined;

  protected createRequest() {
    const formValues = {
      ...this.form.value,
    };

    if (this.selected) {
      return this.proxyService.update(this.selected.id, {
        ...formValues,
        concurrencyStamp: this.selected.concurrencyStamp,
      });
    }

    return this.proxyService.create(formValues);
  }

  buildForm() {
    const { shortName, fullName, phone, isOutsource, isSupplier, address, taxNo, taxOffice } =
      this.selected || {};

    this.form = this.fb.group({
      shortName: [shortName ?? null, [Validators.required]],
      fullName: [fullName ?? null, [Validators.required]],
      phone: [phone ?? null, [Validators.required, Validators.pattern(/^\+?[0-9]{10,15}$/)]],
      isOutsource: [isOutsource ?? false, []],
      isSupplier: [isSupplier ?? false, []],
      address: [address ?? null, []],
      taxNo: [taxNo ?? null, []],
      taxOffice: [taxOffice ?? null, []],
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

  update(record: SourceDto) {
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

  changeVisible($event: boolean) {
    this.isVisible = $event;
  }
}
