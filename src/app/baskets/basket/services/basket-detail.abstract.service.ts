import { inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ListService, TrackByService } from '@abp/ng.core';

import { finalize, tap } from 'rxjs/operators';

import type { BasketWithNavigationPropertiesDto, BasketPaymentUpdateDto } from '../../../proxy/baskets/models';
import { BasketService } from '../../../proxy/baskets/basket.service';

export abstract class AbstractBasketDetailViewService {
  protected readonly fb = inject(FormBuilder);
  protected readonly track = inject(TrackByService);

  public readonly proxyService = inject(BasketService);
  public readonly list = inject(ListService);

  public readonly getCustomerLookup = this.proxyService.getCustomerLookup;

  isBusy = false;
  isVisible = false;
  selected = {} as any;
  form: FormGroup | undefined;

  protected createRequest() {
    const formValues = {
      ...this.form.value,
    };

    if (this.selected) {
      return this.proxyService.paymentUpdate(this.selected.basket.id, {
        ...formValues,
        concurrencyStamp: this.selected.basket.concurrencyStamp,
      });
    }

    return this.proxyService.create(formValues);
  }

  buildForm() {
    const { hasInvoice, isIssued, paymentDate, applicationId, customerId } =
      this.selected?.basket || {};

    this.form = this.fb.group({
      hasInvoice: [hasInvoice ?? false, []],
      isIssued: [isIssued ?? false, []],
      paymentDate: [paymentDate ?? null, []],
      applicationId: [applicationId ?? null, []],
      customerId: [customerId ?? null, []],
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

  // update(record: BasketWithNavigationPropertiesDto) {
  //   this.selected = record;
  //   this.showForm();
  // }

  paymentUpdate(record: BasketPaymentUpdateDto) {
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
