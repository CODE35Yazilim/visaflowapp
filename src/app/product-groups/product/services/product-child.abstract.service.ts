import { inject, ChangeDetectorRef } from '@angular/core';
import { filter, switchMap } from 'rxjs/operators';
import { ABP, ListService, PagedResultDto } from '@abp/ng.core';
import { ConfirmationService, Confirmation } from '@abp/ng.theme.shared';
import type { GetProductListInput, ProductDto } from '../../../proxy/products/models';
import { ProductService } from '../../../proxy/products/product.service';

export abstract class AbstractProductViewService {
  protected readonly cdr = inject(ChangeDetectorRef);
  protected readonly proxyService = inject(ProductService);
  protected readonly confirmationService = inject(ConfirmationService);
  protected readonly list = inject(ListService);

  data: PagedResultDto<ProductDto> = {
    items: [],
    totalCount: 0,
  };

  delete(record: ProductDto) {
    this.confirmationService
      .warn('::DeleteConfirmationMessage', '::AreYouSure', { messageLocalizationParams: [] })
      .pipe(
        filter(status => status === Confirmation.Status.confirm),
        switchMap(() => this.proxyService.delete(record.id)),
      )
      .subscribe(this.list.get);
  }

  hookToQuery(productGroupId: string) {
    const getData = (query: ABP.PageQueryParams) =>
      this.proxyService.getListByProductGroupId({
        ...(query as GetProductListInput),
        productGroupId,
      });

    const setData = (list: PagedResultDto<ProductDto>) => (this.data = list);

    this.list.hookToQuery(getData).subscribe(list => {
      setData(list);
      this.cdr.markForCheck();
    });
  }
}
