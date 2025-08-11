// transaction-detail.abstract.service.ts

import { inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ListService, TrackByService } from '@abp/ng.core';
import type { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';
import { paymentTypeOptions, PaymentType } from '../../../proxy/transactions/payment-type.enum';
import type {
  TransactionCreateDto,
  TransactionWithNavigationPropertiesDto,
  CreateTransactionAmountCurrencyDto,
  CurrencyConvertDto
} from '../../../proxy/transactions/models';
import { TransactionService } from '../../../proxy/transactions/transaction.service';

export abstract class AbstractTransactionDetailViewService {
  protected readonly fb = inject(FormBuilder);
  protected readonly track = inject(TrackByService);
  public readonly proxyService = inject(TransactionService);
  public readonly list = inject(ListService);
  public readonly getCurrencyLookup = this.proxyService.getCurrencyLookup;

  paymentTypeOptions = paymentTypeOptions;
  form!: FormGroup;
  isVisible = false;
  isBusy = false;
  mode!: 'collection' | 'cost' | 'convert';
  basketId!: string;
  selected?: TransactionWithNavigationPropertiesDto;

  /** ▶ Mod’a göre çağrılacak metotlar */
  public addCollection(basketId: string) {
    this.mode = 'collection';
    this.basketId = basketId;
    this.showForm();
  }
  public addCost(basketId: string) {
    this.mode = 'cost';
    this.basketId = basketId;
    this.showForm();
  }
  public currencyConvert(): void {
    this.mode = 'convert';
    this.selected = undefined;
    this.buildForm();
    this.isVisible = true;
  }

  protected showForm() {
    this.selected = undefined;
    this.buildForm();
    this.isVisible = true;
  }

  protected buildForm() {
    if (this.mode === 'convert') {
      this.form = this.fb.group({
        sourceCurrencyId: [null, Validators.required],
        targetCurrencyId: [null, Validators.required],
        amount:           [null, Validators.required],
      });
    } else {
      this.form = this.fb.group({
        amount:     [null, Validators.required],
        currencyId: [null, Validators.required],
      });
    }
  }

  /** ◀ Burayı değiştirdik: createRequest artık mode’a göre
   *   farklı proxyService metodlarını çağırıyor. */
protected createRequest(): Observable<any> {
  const v = this.form.value;
  if (this.mode === 'collection') {
    return this.proxyService.addPayment(
      this.basketId,
      { amount: v.amount, currencyId: v.currencyId }
    );
  }
  if (this.mode === 'cost') {
    return this.proxyService.addCost(
      this.basketId,
      { amount: v.amount, currencyId: v.currencyId }
    );
  }
  // convert
  return this.proxyService.currencyConvert({
    sourceCurrencyId: v.sourceCurrencyId,
    targetCurrencyId: v.targetCurrencyId,
    amount:           v.amount,
  });
}


public submitForm(): void {
  if (this.form.invalid) {
    return;
  }
  // 1) İşlem başında busy flag’i set et
  this.isBusy = true;

  // 2) Mode’a göre doğru API çağrısını yap
  this.createRequest()
    .pipe(
      // finalize’e Sadece bir callback veriyoruz:
      finalize(() => {
        this.isBusy = false;     // iş bittiğinde busy flag’i temizle
      }),
      tap(() => {
        this.isVisible = false;  // modal’ı kapat
        this.list.get();         // listeyi yeniden yükle
      })
    )
    // subscribe’a parametre geçmiyoruz
    .subscribe();
}






  public changeVisible(v: boolean) {
    this.isVisible = v;
  }
}
