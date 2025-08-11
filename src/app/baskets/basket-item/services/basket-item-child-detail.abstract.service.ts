import { inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ListService, TrackByService } from '@abp/ng.core';

import { finalize, tap } from 'rxjs/operators';

import type { BasketItemWithNavigationPropertiesDto } from '../../../proxy/basket-items/models';
import { BasketItemService } from '../../../proxy/basket-items/basket-item.service';

export abstract class AbstractBasketItemDetailViewService {
  protected readonly fb = inject(FormBuilder);
  protected readonly track = inject(TrackByService);

  public readonly proxyService = inject(BasketItemService);
  public readonly list = inject(ListService);

  public readonly getProductLookup = this.proxyService.getProductLookup;

  public readonly getCurrencyLookup = this.proxyService.getCurrencyLookup;

  public readonly getSourceLookup = this.proxyService.getSourceLookup;

  basketId: string;

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
    const { productId, currencyId, sourceId, amount, piece } = this.selected || {};

    this.form = this.fb.group({
      basketId: [this.basketId],
      productId: [productId ?? null, [Validators.required]],
      currencyId: [currencyId ?? null, [Validators.required]],
      sourceId: [sourceId ?? null, []],
      amount: [amount ?? '0', [Validators.required]],
      piece: [piece ?? '1', [Validators.required]],
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

  update(record: BasketItemWithNavigationPropertiesDto) {
    this.selected = record.basketItem;
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
