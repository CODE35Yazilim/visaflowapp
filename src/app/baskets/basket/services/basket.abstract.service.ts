import { inject, computed, signal } from '@angular/core';
import { SelectionType } from '@swimlane/ngx-datatable';
import { ConfirmationService, Confirmation } from '@abp/ng.theme.shared';
import { ABP, AbpWindowService, ListService, PagedResultDto } from '@abp/ng.core';
import { filter, switchMap, finalize } from 'rxjs/operators';
import type {
  GetBasketsInput,
  BasketWithNavigationPropertiesDto,
  BasketHasInvoiceUpdateDto,
  BasketIsIssuedUpdateDto
} from '../../../proxy/baskets/models';
import { BasketService } from '../../../proxy/baskets/basket.service';

export abstract class AbstractBasketViewService {
  protected readonly proxyService   = inject(BasketService);
  protected readonly confirmationService = inject(ConfirmationService);
  protected readonly list           = inject(ListService);
  protected readonly abpWindowService = inject(AbpWindowService);

  isExportToExcelBusy = false;

  data: PagedResultDto<BasketWithNavigationPropertiesDto> = {
    items: [],
    totalCount: 0,
  };

  selectionType   = SelectionType;
  selected        = signal<BasketWithNavigationPropertiesDto[]>([]);
  allSelected     = signal(false);
  selectedCount   = computed(() => this.selected().length);

  filters = {} as GetBasketsInput;

  protected clearAllSelection() {
    this.selected.set([]);
    this.allSelected.set(false);
  }

  protected bulkDeleteRequest() {
    const ids = this.selected().map(({ basket: { id } }) => id);
    const req = !this.allSelected()
      ? this.proxyService.deleteByIds(ids)
      : this.proxyService.deleteAll({
          filterText: this.list.filter,
          ...this.filters,
        });
    return req.pipe(finalize(this.list.get));
  }

  delete(record: BasketWithNavigationPropertiesDto) {
    this.confirmationService
      .warn('::DeleteConfirmationMessage', '::AreYouSure', { messageLocalizationParams: [] })
      .pipe(
        filter(s => s === Confirmation.Status.confirm),
        switchMap(() => this.proxyService.delete(record.basket.id)),
      )
      .subscribe(this.list.get);
  }

  bulkDelete() {
    if (this.selectedCount() < 1) return;

    let msg = '::';
    let param: string | null = null;
    if (this.allSelected()) {
      msg += 'DeleteAllRecords';
    } else {
      msg += 'DeleteSelectedRecords';
      param = this.selectedCount().toString();
    }

    this.confirmationService
      .warn(msg, 'AbpUi::AreYouSure', { messageLocalizationParams: [param] })
      .pipe(
        filter(r => r === Confirmation.Status.confirm),
        switchMap(() => this.bulkDeleteRequest()),
      )
      .subscribe();
  }

  selectAll() {
    this.allSelected.set(!this.allSelected());
    this.selected.set(this.allSelected() ? [...this.data.items] : []);
  }

  toggleHasInvoice(id: string, current: boolean) {
    const dto: BasketHasInvoiceUpdateDto = { hasInvoice: !current };
    this.proxyService
      .updateHasInvoice(id, dto)
      .pipe(finalize(() => this.list.get()))
      .subscribe();
  }

  toggleIsIssued(id: string, current: boolean) {
    const dto: BasketIsIssuedUpdateDto = { isIssued: !current };
    this.proxyService
      .updateIsIssued(id, dto)
      .pipe(finalize(() => this.list.get()))
      .subscribe();
  }

  onSelect({ selected }: { selected: BasketWithNavigationPropertiesDto[] }) {
    if (selected.length < 1) {
      this.clearAllSelection();
    } else if (selected.length === this.data.totalCount) {
      this.allSelected.set(true);
      this.selected.set(selected);
    } else {
      if (this.allSelected()) this.allSelected.set(false);
      this.selected.set(selected);
    }
  }

  hookToQuery() {
    const get = (q: ABP.PageQueryParams) =>
      this.proxyService.getList({ ...q, ...this.filters, filterText: q.filter });
    this.list
      .hookToQuery(get)
      .subscribe((d: PagedResultDto<BasketWithNavigationPropertiesDto>) => {
        this.data = d;
        if (this.selectedCount() > 0) this.clearAllSelection();
      });
  }

  clearFilters() {
    this.filters = {} as GetBasketsInput;
    this.list.get();
  }

  exportToExcel() {
    this.isExportToExcelBusy = true;
    this.proxyService
      .getDownloadToken()
      .pipe(
        switchMap(({ token }) =>
          this.proxyService.getListAsExcelFile({
            downloadToken: token,
            filterText: this.list.filter,
            ...this.filters,
          }),
        ),
        finalize(() => (this.isExportToExcelBusy = false)),
      )
      .subscribe(blob => this.abpWindowService.downloadBlob(blob, 'Baskets.xlsx'));
  }
}
