import { inject, ChangeDetectorRef } from '@angular/core';
import { filter, switchMap } from 'rxjs/operators';
import { ABP, ListService, PagedResultDto } from '@abp/ng.core';
import { ConfirmationService, Confirmation } from '@abp/ng.theme.shared';
import type {
  GetBasketItemListInput,
  BasketItemWithNavigationPropertiesDto,
} from '../../../proxy/basket-items/models';
import { BasketItemService } from '../../../proxy/basket-items/basket-item.service';

export abstract class AbstractBasketItemViewService {
  protected readonly cdr = inject(ChangeDetectorRef);
  protected readonly proxyService = inject(BasketItemService);
  protected readonly confirmationService = inject(ConfirmationService);
  protected readonly list = inject(ListService);

  data: PagedResultDto<BasketItemWithNavigationPropertiesDto> = {
    items: [],
    totalCount: 0,
  };

  delete(record: BasketItemWithNavigationPropertiesDto) {
    this.confirmationService
      .warn('::DeleteConfirmationMessage', '::AreYouSure', { messageLocalizationParams: [] })
      .pipe(
        filter(status => status === Confirmation.Status.confirm),
        switchMap(() => this.proxyService.delete(record.basketItem.id)),
      )
      .subscribe(this.list.get);
  }

  hookToQuery(basketId: string) {
    const getData = (query: ABP.PageQueryParams) =>
      this.proxyService.getListWithNavigationPropertiesByBasketId({
        ...(query as GetBasketItemListInput),
        basketId,
      });

    const setData = (list: PagedResultDto<BasketItemWithNavigationPropertiesDto>) =>
      (this.data = list);

    this.list.hookToQuery(getData).subscribe(list => {
      setData(list);
      this.cdr.markForCheck();
    });
  }
}
