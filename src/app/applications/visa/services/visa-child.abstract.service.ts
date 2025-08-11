import { inject, ChangeDetectorRef } from '@angular/core';
import { filter, switchMap } from 'rxjs/operators';
import { ABP, ListService, PagedResultDto } from '@abp/ng.core';
import { ConfirmationService, Confirmation } from '@abp/ng.theme.shared';
import type { GetVisaListInput, VisaDto } from '../../../proxy/visas/models';
import { VisaService } from '../../../proxy/visas/visa.service';

export abstract class AbstractVisaViewService {
  protected readonly cdr = inject(ChangeDetectorRef);
  protected readonly proxyService = inject(VisaService);
  protected readonly confirmationService = inject(ConfirmationService);
  protected readonly list = inject(ListService);

  data: PagedResultDto<VisaDto> = {
    items: [],
    totalCount: 0,
  };

  delete(record: VisaDto) {
    this.confirmationService
      .warn('::DeleteConfirmationMessage', '::AreYouSure', { messageLocalizationParams: [] })
      .pipe(
        filter(status => status === Confirmation.Status.confirm),
        switchMap(() => this.proxyService.delete(record.id)),
      )
      .subscribe(this.list.get);
  }

  hookToQuery(applicationId: string) {
    const getData = (query: ABP.PageQueryParams) =>
      this.proxyService.getListByApplicationId({
        ...(query as GetVisaListInput),
        applicationId,
      });

    const setData = (list: PagedResultDto<VisaDto>) => (this.data = list);

    this.list.hookToQuery(getData).subscribe(list => {
      setData(list);
      this.cdr.markForCheck();
    });
  }
}
