import type { BasketCreateDto, BasketDto, BasketExcelDownloadDto, BasketHasInvoiceUpdateDto, BasketIsIssuedUpdateDto, BasketPaymentUpdateDto, BasketUpdateDto, BasketWithNavigationPropertiesDto, GetBasketsInput } from './models';
import { RestService, Rest } from '@abp/ng.core';
import type { PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import type { DownloadTokenResultDto, LookupDto, LookupRequestDto } from '../shared/models';

@Injectable({
  providedIn: 'root',
})
export class BasketService {
  apiName = 'Default';
  

  create = (input: BasketCreateDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, BasketDto>({
      method: 'POST',
      url: '/api/app/baskets',
      body: input,
    },
    { apiName: this.apiName,...config });
  

  delete = (id: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: `/api/app/baskets/${id}`,
    },
    { apiName: this.apiName,...config });
  

  deleteAll = (input: GetBasketsInput, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: '/api/app/baskets/all',
      params: { filterText: input.filterText, hasInvoice: input.hasInvoice, isIssued: input.isIssued, paymentDateMin: input.paymentDateMin, paymentDateMax: input.paymentDateMax, customerId: input.customerId, sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName,...config });
  

  deleteByIds = (basketIds: string[], config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: '/api/app/baskets',
      params: { basketIds },
    },
    { apiName: this.apiName,...config });
  

  get = (id: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, BasketDto>({
      method: 'GET',
      url: `/api/app/baskets/${id}`,
    },
    { apiName: this.apiName,...config });
  

  getCustomerLookup = (input: LookupRequestDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, PagedResultDto<LookupDto<string>>>({
      method: 'GET',
      url: '/api/app/baskets/customer-lookup',
      params: { filter: input.filter, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName,...config });
  

  getDownloadToken = (config?: Partial<Rest.Config>) =>
    this.restService.request<any, DownloadTokenResultDto>({
      method: 'GET',
      url: '/api/app/baskets/download-token',
    },
    { apiName: this.apiName,...config });
  

  getList = (input: GetBasketsInput, config?: Partial<Rest.Config>) =>
    this.restService.request<any, PagedResultDto<BasketWithNavigationPropertiesDto>>({
      method: 'GET',
      url: '/api/app/baskets',
      params: { filterText: input.filterText, hasInvoice: input.hasInvoice, isIssued: input.isIssued, paymentDateMin: input.paymentDateMin, paymentDateMax: input.paymentDateMax, customerId: input.customerId, sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName,...config });
  

  getListAsExcelFile = (input: BasketExcelDownloadDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, Blob>({
      method: 'GET',
      responseType: 'blob',
      url: '/api/app/baskets/as-excel-file',
      params: { downloadToken: input.downloadToken, filterText: input.filterText, hasInvoice: input.hasInvoice, isIssued: input.isIssued, paymentDateMin: input.paymentDateMin, paymentDateMax: input.paymentDateMax, customerId: input.customerId },
    },
    { apiName: this.apiName,...config });
  

  getWithNavigationProperties = (id: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, BasketWithNavigationPropertiesDto>({
      method: 'GET',
      url: `/api/app/baskets/with-navigation-properties/${id}`,
    },
    { apiName: this.apiName,...config });
  

  paymentUpdate = (id: string, input: BasketPaymentUpdateDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, BasketDto>({
      method: 'PUT',
      url: `/api/app/baskets/${id}/payment-update`,
      body: input,
    },
    { apiName: this.apiName,...config });
  

  update = (id: string, input: BasketUpdateDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, BasketDto>({
      method: 'PUT',
      url: `/api/app/baskets/${id}`,
      body: input,
    },
    { apiName: this.apiName,...config });
  

  updateHasInvoice = (id: string, input: BasketHasInvoiceUpdateDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, BasketDto>({
      method: 'PUT',
      url: `/api/app/baskets/${id}/has-invoice`,
      body: input,
    },
    { apiName: this.apiName,...config });
  

  updateIsIssued = (id: string, input: BasketIsIssuedUpdateDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, BasketDto>({
      method: 'PUT',
      url: `/api/app/baskets/${id}/is-issued`,
      body: input,
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}
