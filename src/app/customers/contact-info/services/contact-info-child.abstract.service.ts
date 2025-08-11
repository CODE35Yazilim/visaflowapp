import { inject, ChangeDetectorRef } from '@angular/core';
import { filter, switchMap } from 'rxjs/operators';
import { ABP, ListService, PagedResultDto } from '@abp/ng.core';
import { ConfirmationService, Confirmation } from '@abp/ng.theme.shared';
import type { GetContactInfoListInput, ContactInfoDto } from '../../../proxy/contact-infos/models';
import { ContactInfoService } from '../../../proxy/contact-infos/contact-info.service';

export abstract class AbstractContactInfoViewService {
  protected readonly cdr = inject(ChangeDetectorRef);
  protected readonly proxyService = inject(ContactInfoService);
  protected readonly confirmationService = inject(ConfirmationService);
  protected readonly list = inject(ListService);

  data: PagedResultDto<ContactInfoDto> = {
    items: [],
    totalCount: 0,
  };

  delete(record: ContactInfoDto) {
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
        ...(query as GetContactInfoListInput),
        customerId,
      });

    const setData = (list: PagedResultDto<ContactInfoDto>) => (this.data = list);

    this.list.hookToQuery(getData).subscribe(list => {
      setData(list);
      this.cdr.markForCheck();
    });
  }
}
