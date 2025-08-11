import { inject, computed, signal } from '@angular/core';
import { SelectionType } from '@swimlane/ngx-datatable';
import { ConfirmationService, Confirmation } from '@abp/ng.theme.shared';
import { ABP, AbpWindowService, ListService, PagedResultDto } from '@abp/ng.core';
import { filter, switchMap, finalize, tap } from 'rxjs/operators';

import type {
  GetApplicationsInput,
  ApplicationWithNavigationPropertiesDto,
  ApplicationReservationUpdateDto,
  ApplicationDocumentedUpdateDto,
  ApplicationDto,
} from '../../../proxy/applications/models';

import { ApplicationService } from '../../../proxy/applications/application.service';
import { ApplicationDetailViewService } from '../services/application-detail.service'; // doğru yolu verin


export abstract class AbstractApplicationViewService {
  protected readonly proxyService = inject(ApplicationService);
  protected readonly confirmationService = inject(ConfirmationService);
  protected readonly list = inject(ListService);
  protected readonly abpWindowService = inject(AbpWindowService);
    protected readonly detailService = inject(ApplicationDetailViewService);
//public visaDetailApplicationId: string | null = null;

  isExportToExcelBusy = false;

  data: PagedResultDto<ApplicationWithNavigationPropertiesDto> = {
    items: [],
    totalCount: 0,
  };

  selectionType = SelectionType;
  selected = signal<ApplicationWithNavigationPropertiesDto[]>([]);
  allSelected = signal(false);
  selectedCount = computed(() => this.selected().length);

  filters = {} as GetApplicationsInput;

  /** UI butonlarının disable edilmesi için */
  busy = {
    updateDocumented: false,
    updateReservation: false,
    setInProgress: false,
    
  };

  
  protected clearAllSelection() {
    this.selected.set([]);
    this.allSelected.set(false);
  }

  protected bulkDeleteRequest() {
    const ids = this.selected().map(({ application: { id } }) => id);

    const request = !this.allSelected()
      ? this.proxyService.deleteByIds(ids)
      : this.proxyService.deleteAll({
          filterText: this.list.filter,
          ...this.filters,
        });

    return request.pipe(finalize(() => this.list.get()));
  }

 
  

  // 1) Belgelendir
  updateDocumented(row: ApplicationWithNavigationPropertiesDto) {
    this.busy.updateDocumented = true;

    const body: ApplicationDocumentedUpdateDto = {
      isDocumented: true,
      concurrencyStamp: row.application.concurrencyStamp
    } as ApplicationDocumentedUpdateDto;

    this.proxyService
      .updateDocumented(row.application.id, body)
      .pipe(finalize(() => (this.busy.updateDocumented = false)))
      .subscribe((updated: ApplicationDto) => {
        row.application.isDocumented = updated.isDocumented ?? true;
        row.application.concurrencyStamp = updated.concurrencyStamp;
      });
  }

  // 2) Randevu ekle / güncelle - Abstract method
  updateReservation(row: ApplicationWithNavigationPropertiesDto) {
    this.detailService.openReservation(row);
  }

  // 3) İşleme al (setInProgress / process)
  process(id: string) {
    this.busy.setInProgress = true;

    this.proxyService
      .setInProgress(id)
      .pipe(finalize(() => (this.busy.setInProgress = false)))
      .subscribe(() => {
        this.list.get();
      });
  }

  //  complete(id: string) {
  //   this.proxyService.complete(id)
  //     .pipe(finalize(() => this.list.get()))
  //     .subscribe(() => {
  //       // Tamamlandıktan sonra modal’ı göster
  //       this.visaDetailApplicationId = id;
        
  //     });
  // }

  // 4) Cancel
  cancel(id: string) {
    this.proxyService.cancel(id).subscribe(() => this.list.get());
  }

 

  delete(record: ApplicationWithNavigationPropertiesDto) {
    this.confirmationService
      .warn('::DeleteConfirmationMessage', '::AreYouSure', { messageLocalizationParams: [] })
      .pipe(
        filter(status => status === Confirmation.Status.confirm),
        switchMap(() => this.proxyService.delete(record.application.id)),
      )
      .subscribe(() => this.list.get());
  }

  bulkDelete() {
    if (this.selectedCount() < 1) {
      return;
    }

    let message = '::';
    let messageParam: string | null = null;

    if (this.allSelected()) {
      message += 'DeleteAllRecords';
    } else {
      message += 'DeleteSelectedRecords';
      messageParam = this.selectedCount().toString();
    }

    this.confirmationService
      .warn(message, 'AbpUi::AreYouSure', {
        messageLocalizationParams: [messageParam],
      })
      .pipe(
        filter(result => result === Confirmation.Status.confirm),
        switchMap(() => this.bulkDeleteRequest()),
      )
      .subscribe();
  }

  selectAll() {
    this.allSelected.set(!this.allSelected());
    this.selected.set(this.allSelected() ? [...this.data.items] : []);
  }

  onSelect({ selected }: { selected: ApplicationWithNavigationPropertiesDto[] }) {
    if (selected.length < 1) {
      this.clearAllSelection();
      return;
    }

    if (selected.length === this.data.totalCount) {
      this.allSelected.set(true);
      this.selected.set(selected);
      return;
    }

    if (selected.length !== this.data.totalCount && this.allSelected()) {
      this.allSelected.set(false);
    }

    if (selected.length === 1) {
      if (this.selected().length < 1) {
        this.selected.set(selected);
        return;
      }

      this.selected.set([...this.selected()]);
      return;
    }

    this.selected.set(selected);
  }

  hookToQuery() {
    const getData = (query: ABP.PageQueryParams) =>
      this.proxyService.getList({
        ...query,
        ...this.filters,
        filterText: query.filter,
      });

    const setData = (list: PagedResultDto<ApplicationWithNavigationPropertiesDto>) => {
      this.data = list;

      if (this.selectedCount() > 0) {
        this.clearAllSelection();
      }
    };

    this.list.hookToQuery(getData).subscribe(setData);
  }

  clearFilters() {
    this.filters = {} as GetApplicationsInput;
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
      .subscribe(result => {
        this.abpWindowService.downloadBlob(result, 'Application.xlsx');
      });
  }
}