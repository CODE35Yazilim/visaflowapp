import { inject, ChangeDetectorRef } from '@angular/core';
import { filter, switchMap } from 'rxjs/operators';
import { ABP, ListService, PagedResultDto } from '@abp/ng.core';
import { ConfirmationService, Confirmation } from '@abp/ng.theme.shared';
import type { GetPassportListInput, PassportDto } from '../../../proxy/passports/models';
import { PassportService } from '../../../proxy/passports/passport.service';

export abstract class AbstractPassportViewService {
  protected readonly cdr = inject(ChangeDetectorRef);
  protected readonly proxyService = inject(PassportService);
  protected readonly confirmationService = inject(ConfirmationService);
  protected readonly list = inject(ListService);

  data: PagedResultDto<PassportDto> = {
    items: [],
    totalCount: 0,
  };

  delete(record: PassportDto) {
    this.confirmationService
      .warn('::DeleteConfirmationMessage', '::AreYouSure', { messageLocalizationParams: [] })
      .pipe(
        filter(status => status === Confirmation.Status.confirm),
        switchMap(() => this.proxyService.delete(record.id)),
      )
      .subscribe(this.list.get);
  }

  hookToQuery(customerId: string) {
    const getData = (query: ABP.PageQueryParams) =>
      this.proxyService.getListByCustomerId({
        ...(query as GetPassportListInput),
        customerId,
      });

    const setData = (list: PagedResultDto<PassportDto>) => (this.data = list);

    this.list.hookToQuery(getData).subscribe(list => {
      setData(list);
      this.cdr.markForCheck();
    });
  }
}
