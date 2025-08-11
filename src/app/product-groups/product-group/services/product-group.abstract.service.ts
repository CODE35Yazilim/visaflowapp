import { inject } from '@angular/core';
import { ConfirmationService, Confirmation } from '@abp/ng.theme.shared';
import { ABP, ListService, PagedResultDto } from '@abp/ng.core';
import { filter, switchMap } from 'rxjs/operators';
import type { GetProductGroupsInput, ProductGroupDto } from '../../../proxy/product-groups/models';
import { ProductGroupService } from '../../../proxy/product-groups/product-group.service';

export abstract class AbstractProductGroupViewService {
  protected readonly proxyService = inject(ProductGroupService);
  protected readonly confirmationService = inject(ConfirmationService);
  protected readonly list = inject(ListService);

  data: PagedResultDto<ProductGroupDto> = {
    items: [],
    totalCount: 0,
  };

  filters = {} as GetProductGroupsInput;

  delete(record: ProductGroupDto) {
    this.confirmationService
      .warn('::DeleteConfirmationMessage', '::AreYouSure', { messageLocalizationParams: [] })
      .pipe(
        filter(status => status === Confirmation.Status.confirm),
        switchMap(() => this.proxyService.delete(record.id)),
      )
      .subscribe(this.list.get);
  }

  hookToQuery() {
    const getData = (query: ABP.PageQueryParams) =>
      this.proxyService.getList({
        ...query,
        ...this.filters,
        filterText: query.filter,
      });

    const setData = (list: PagedResultDto<ProductGroupDto>) => {
      this.data = list;
    };

    this.list.hookToQuery(getData).subscribe(setData);
  }

  clearFilters() {
    this.filters = {} as GetProductGroupsInput;
    this.list.get();
  }
}
