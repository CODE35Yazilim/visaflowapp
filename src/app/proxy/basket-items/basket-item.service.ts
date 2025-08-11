import type { BasketItemCreateDto, BasketItemDto, BasketItemUpdateDto, BasketItemWithNavigationPropertiesDto, GetBasketItemListInput, GetBasketItemsInput } from './models';
import { RestService, Rest } from '@abp/ng.core';
import type { PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import type { LookupDto, LookupRequestDto } from '../shared/models';

@Injectable({
  providedIn: 'root',
})
export class BasketItemService {
  apiName = 'Default';
  

  create = (input: BasketItemCreateDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, BasketItemDto>({
      method: 'POST',
      url: '/api/app/basket-items',
      body: input,
    },
    { apiName: this.apiName,...config });
  

  delete = (id: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: `/api/app/basket-items/${id}`,
    },
    { apiName: this.apiName,...config });
  

  get = (id: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, BasketItemDto>({
      method: 'GET',
      url: `/api/app/basket-items/${id}`,
    },
    { apiName: this.apiName,...config });
  

  getCurrencyLookup = (input: LookupRequestDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, PagedResultDto<LookupDto<string>>>({
      method: 'GET',
      url: '/api/app/basket-items/currency-lookup',
      params: { filter: input.filter, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName,...config });
  

  getList = (input: GetBasketItemsInput, config?: Partial<Rest.Config>) =>
    this.restService.request<any, PagedResultDto<BasketItemWithNavigationPropertiesDto>>({
      method: 'GET',
      url: '/api/app/basket-items',
      params: { filterText: input.filterText, amountMin: input.amountMin, amountMax: input.amountMax, pieceMin: input.pieceMin, pieceMax: input.pieceMax, productId: input.productId, currencyId: input.currencyId, sourceId: input.sourceId, sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName,...config });
  

  getListByBasketId = (input: GetBasketItemListInput, config?: Partial<Rest.Config>) =>
    this.restService.request<any, PagedResultDto<BasketItemDto>>({
      method: 'GET',
      url: '/api/app/basket-items/by-basket',
      params: { basketId: input.basketId, sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName,...config });
  

  getListWithNavigationPropertiesByBasketId = (input: GetBasketItemListInput, config?: Partial<Rest.Config>) =>
    this.restService.request<any, PagedResultDto<BasketItemWithNavigationPropertiesDto>>({
      method: 'GET',
      url: '/api/app/basket-items/detailed/by-basket',
      params: { basketId: input.basketId, sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName,...config });
  

  getProductLookup = (input: LookupRequestDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, PagedResultDto<LookupDto<string>>>({
      method: 'GET',
      url: '/api/app/basket-items/product-lookup',
      params: { filter: input.filter, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName,...config });
  

  getSourceLookup = (input: LookupRequestDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, PagedResultDto<LookupDto<string>>>({
      method: 'GET',
      url: '/api/app/basket-items/source-lookup',
      params: { filter: input.filter, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName,...config });
  

  getWithNavigationProperties = (id: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, BasketItemWithNavigationPropertiesDto>({
      method: 'GET',
      url: `/api/app/basket-items/with-navigation-properties/${id}`,
    },
    { apiName: this.apiName,...config });
  

  update = (id: string, input: BasketItemUpdateDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, BasketItemDto>({
      method: 'PUT',
      url: `/api/app/basket-items/${id}`,
      body: input,
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}
