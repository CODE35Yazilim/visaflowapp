import { inject, Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ListService, TrackByService } from '@abp/ng.core';
import { finalize, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { ApplicationStatus } from '../../../proxy/applications/application-status.enum';
import type {
  ApplicationWithNavigationPropertiesDto,
  ApplicationReservationUpdateDto,
  ApplicationCreateDto,
  ApplicationUpdateDto,
  ApplicationDto,
} from '../../../proxy/applications/models';
import { ApplicationService } from '../../../proxy/applications/application.service';
import { BasketItemService } from '../../../proxy/basket-items/basket-item.service';

@Injectable()
export abstract class AbstractApplicationDetailViewService {
  protected readonly fb = inject(FormBuilder);
  protected readonly track = inject(TrackByService);

  public readonly proxyService = inject(ApplicationService);
  public readonly proxyBasketService = inject(BasketItemService);
  public readonly list = inject(ListService);

  public readonly getCustomerLookup = this.proxyService.getCustomerLookup;
  public readonly getSourceLookup = this.proxyService.getSourceLookup;
  public readonly getOutSourceLookup = this.proxyService.getOutSourceLookup;
  public readonly getCountryLookup = this.proxyService.getCountryLookup;
  public readonly getMainProductLookup = this.proxyService.getMainProductLookup;
  public readonly getCurrencyLookup = this.proxyBasketService.getCurrencyLookup;

  isBusy = false;
  isVisible = false;
  reservationMode = false;

  selected?: ApplicationWithNavigationPropertiesDto;
  form!: FormGroup;

  // -------------------- PUBLIC API --------------------

  create() {
    this.selected = undefined;
    this.reservationMode = false;
    this.buildFormForCreate();
    this.showForm();
  }

  update(record: ApplicationWithNavigationPropertiesDto) {
    this.selected = record;
    this.reservationMode = false;
    this.buildFormForEdit(record);
    this.showForm();
  }

  openReservation(record: ApplicationWithNavigationPropertiesDto) {
    this.selected = record;
    this.reservationMode = true;
    this.buildFormForReservation(record);
    this.showForm();
  }

  showForm() {
    this.isVisible = true;
  }

  hideForm() {
    this.isVisible = false;
  }

  changeVisible($event: boolean) {
    this.isVisible = $event;
  }

  submitForm() {
    if (!this.form) {
      console.error('Form is not initialized');
      return;
    }
    
    if (this.form.invalid) {
      // Form kontrollerini işaretle
      Object.keys(this.form.controls).forEach(key => {
        const control = this.form.get(key);
        if (control && control.invalid) {
          control.markAsTouched();
          control.markAsDirty();
        }
      });
      console.log('Form is invalid:', this.form.errors, this.form.value);
      return;
    }
    
    if (this.isBusy) return;

    // 1) Reservation Mode
    if (this.reservationMode && this.selected) {
      this.isBusy = true;

      const v = this.form.value;

      const dto: ApplicationReservationUpdateDto = {
        reservationDate: this.toDateOnly(v.reservationDate),
        reservationTime: this.toTimeOnly(v.reservationTime),
        notes: v.notes ?? null,
        trackingCode: v.trackingCode ?? null,
      };

      if (!dto.reservationDate) {
        this.form.get('reservationDate')?.setErrors({ required: true });
        this.isBusy = false;
        return;
      }

      this.proxyService
        .updateReservation(this.selected.application.id, dto)
        .pipe(finalize(() => (this.isBusy = false)))
        .subscribe(updated => {
          this.selected!.application.reservationDate =
            updated.reservationDate ?? dto.reservationDate;
          this.selected!.application.reservationTime =
            updated.reservationTime ?? dto.reservationTime;
          this.selected!.application.trackingCode =
            updated.trackingCode ?? dto.trackingCode;
          this.hideForm();
          this.list.get();
        });

      return;
    }

    // 2) Create
    if (!this.selected) {
      this.isBusy = true;
      this.createRequest()
        .pipe(
          finalize(() => (this.isBusy = false)),
          tap(() => this.hideForm()),
        )
        .subscribe(() => this.list.get());
      return;
    }

    // 3) Update
    this.isBusy = true;
    this.updateRequest()
      .pipe(
        finalize(() => (this.isBusy = false)),
        tap(() => this.hideForm()),
      )
      .subscribe(() => this.list.get());
  }

  // -------------------- REQUESTS --------------------

  private createRequest(): Observable<ApplicationDto> {
    const v = this.form.value;

    const dto: ApplicationCreateDto = {
      customerId: v.customerId,
      sourceId: v.sourceId,
      outSourceId: v.outSourceId,
      countryId: v.countryId,
      isDocumented: v.isDocumented ?? false,
      applicationStatus: ApplicationStatus.NoReserved,

      hasInvoice: v.hasInvoice ?? false,

      basketItems: [
        {
          productId: v.mainProductId,
          currencyId: v.currencyId,
          amount: v.amount,
          piece: 1,
        },
      ],

      notes: v.notes || null,
      refCode: v.refCode || null,
      reservationDate: this.toDateOnly(v.reservationDate),
      reservationTime: this.toTimeOnly(v.reservationTime),
      trackingCode: v.trackingCode || null,
    };

    return this.proxyService.create(dto);
  }

  private updateRequest(): Observable<ApplicationDto> {
    const v = this.form.value;

    const dto: ApplicationUpdateDto = {
      notes: v.notes || null,
      refCode: v.refCode || null,
      reservationDate: this.toDateOnly(v.reservationDate),
      reservationTime: this.toTimeOnly(v.reservationTime),
      trackingCode: v.trackingCode || null,
      isDocumented: v.isDocumented ?? false,
      concurrencyStamp: this.selected?.application.concurrencyStamp,
    } as ApplicationUpdateDto;

    return this.proxyService.update(this.selected!.application.id, dto);
  }

  // -------------------- FORMs --------------------

  private buildFormForCreate() {
    this.form = this.fb.group({
      customerId: [null, [Validators.required]],
      sourceId: [null, [Validators.required]],
      outSourceId: [null, [Validators.required]],
      countryId: [null, [Validators.required]],
      mainProductId: [null, [Validators.required]],

      isDocumented: [false],
      hasInvoice: [false],

      currencyId: [null, [Validators.required]],
      amount: [null, [Validators.required, Validators.min(0.01)]],

      notes: [null],
      refCode: [null],
      reservationDate: [null],
      reservationTime: [null],
      trackingCode: [null],
    });
  }

  private buildFormForEdit(record: ApplicationWithNavigationPropertiesDto) {
    const app = record.application;

    this.form = this.fb.group({
      // Edit modunda bu alanlar readonly olmalı veya hiç gösterilmemeli
      customerId: [app.customerId ?? null],
      sourceId: [app.sourceId ?? null],
      outSourceId: [app.outSourceId ?? null],
      countryId: [app.countryId ?? null],
      // mainProductId edit modunda template'te gösterilmiyor, null bırakıyoruz
      mainProductId: [null],

      isDocumented: [app.isDocumented ?? false],
      hasInvoice: [false], // Edit'te bu alan kullanılmıyor

      currencyId: [null], // Edit'te bu alan kullanılmıyor
      amount: [null], // Edit'te bu alan kullanılmıyor

      notes: [app.notes ?? null],
      refCode: [app.refCode ?? null],
      reservationDate: [this.toNgbDate(app.reservationDate)],
      reservationTime: [app.reservationTime ?? null],
      trackingCode: [app.trackingCode ?? null],
    });
  }

  private buildFormForReservation(record: ApplicationWithNavigationPropertiesDto) {
    const { reservationDate, reservationTime, notes, trackingCode } = record.application;

    this.form = this.fb.group({
      reservationDate: [this.toNgbDate(reservationDate), [Validators.required]],
      reservationTime: [reservationTime ?? null],
      notes: [notes ?? null],
      trackingCode: [trackingCode ?? null, [Validators.required]]
    });
  }

  // -------------------- HELPERS --------------------

  private toNgbDate(iso?: string | null) {
    if (!iso) return null;
    const d = new Date(iso);
    if (isNaN(d.getTime())) return null;
    return { year: d.getFullYear(), month: d.getMonth() + 1, day: d.getDate() };
  }

  /** Backend DateOnly bekliyorsa: yyyy-MM-dd gönderiyoruz */
  private toDateOnly(val: any): string | null {
    if (!val) return null;

    if (typeof val === 'object' && 'year' in val && 'month' in val && 'day' in val) {
      const y = (val.year as number).toString().padStart(4, '0');
      const m = (val.month as number).toString().padStart(2, '0');
      const d = (val.day as number).toString().padStart(2, '0');
      return `${y}-${m}-${d}`;
    }

    const d = new Date(val);
    if (isNaN(d.getTime())) return null;
    const y = d.getFullYear().toString().padStart(4, '0');
    const m = (d.getMonth() + 1).toString().padStart(2, '0');
    const day = d.getDate().toString().padStart(2, '0');
    return `${y}-${m}-${day}`;
  }

  /** HH:mm[:ss] -> HH:mm:ss */
  private toTimeOnly(val: any): string | null {
    if (!val) return null;

    if (typeof val === 'string') {
      const parts = val.split(':');
      if (parts.length < 2) return null;
      const h = (parts[0] || '0').padStart(2, '0');
      const m = (parts[1] || '0').padStart(2, '0');
      const s = (parts[2] || '0').padStart(2, '0');
      return `${h}:${m}:${s}`;
    }

    if (typeof val === 'object' && 'hour' in val && 'minute' in val) {
      const h = (val.hour ?? 0).toString().padStart(2, '0');
      const m = (val.minute ?? 0).toString().padStart(2, '0');
      const s = (val.second ?? 0).toString().padStart(2, '0');
      return `${h}:${m}:${s}`;
    }

    return null;
  }
}