import type { CreateTransactionAmountCurrencyDto, CurrencyConvertDto, GetTransactionsInput, TransactionCreateDto, TransactionDto, TransactionExcelDownloadDto, TransactionUpdateDto, TransactionWithNavigationPropertiesDto } from './models';
import { RestService, Rest } from '@abp/ng.core';
import type { PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import type { DownloadTokenResultDto, LookupDto, LookupRequestDto } from '../shared/models';

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  apiName = 'Default';
  

  addCost = (basketId: string, input: CreateTransactionAmountCurrencyDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, TransactionDto>({
      method: 'POST',
      url: `/api/app/transactions/${basketId}/add-cost`,
      body: input,
    },
    { apiName: this.apiName,...config });
  

  addPayment = (basketId: string, input: CreateTransactionAmountCurrencyDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, TransactionDto>({
      method: 'POST',
      url: `/api/app/transactions/${basketId}/add-payment`,
      body: input,
    },
    { apiName: this.apiName,...config });
  

  create = (input: TransactionCreateDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, TransactionDto>({
      method: 'POST',
      url: '/api/app/transactions',
      body: input,
    },
    { apiName: this.apiName,...config });
  

  currencyConvert = (input: CurrencyConvertDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, TransactionDto[]>({
      method: 'POST',
      url: '/api/app/transactions/currency-convert',
      body: input,
    },
    { apiName: this.apiName,...config });
  

  delete = (id: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: `/api/app/transactions/${id}`,
    },
    { apiName: this.apiName,...config });
  

  deleteAll = (input: GetTransactionsInput, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: '/api/app/transactions/all',
      params: { filterText: input.filterText, amountMin: input.amountMin, amountMax: input.amountMax, mainAmountMin: input.mainAmountMin, mainAmountMax: input.mainAmountMax, exchangeRateMin: input.exchangeRateMin, exchangeRateMax: input.exchangeRateMax, isExpense: input.isExpense, paymentType: input.paymentType, basketId: input.basketId, currencyId: input.currencyId, sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName,...config });
  

  deleteByIds = (transactionIds: string[], config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: '/api/app/transactions',
      params: { transactionIds },
    },
    { apiName: this.apiName,...config });
  

  get = (id: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, TransactionDto>({
      method: 'GET',
      url: `/api/app/transactions/${id}`,
    },
    { apiName: this.apiName,...config });
  

  getBasketLookup = (input: LookupRequestDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, PagedResultDto<LookupDto<string>>>({
      method: 'GET',
      url: '/api/app/transactions/basket-lookup',
      params: { filter: input.filter, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName,...config });
  

  getCurrencyLookup = (input: LookupRequestDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, PagedResultDto<LookupDto<string>>>({
      method: 'GET',
      url: '/api/app/transactions/currency-lookup',
      params: { filter: input.filter, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName,...config });
  

  getDownloadToken = (config?: Partial<Rest.Config>) =>
    this.restService.request<any, DownloadTokenResultDto>({
      method: 'GET',
      url: '/api/app/transactions/download-token',
    },
    { apiName: this.apiName,...config });
  

  getList = (input: GetTransactionsInput, config?: Partial<Rest.Config>) =>
    this.restService.request<any, PagedResultDto<TransactionWithNavigationPropertiesDto>>({
      method: 'GET',
      url: '/api/app/transactions',
      params: { filterText: input.filterText, amountMin: input.amountMin, amountMax: input.amountMax, mainAmountMin: input.mainAmountMin, mainAmountMax: input.mainAmountMax, exchangeRateMin: input.exchangeRateMin, exchangeRateMax: input.exchangeRateMax, isExpense: input.isExpense, paymentType: input.paymentType, basketId: input.basketId, currencyId: input.currencyId, sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName,...config });
  

  getListAsExcelFile = (input: TransactionExcelDownloadDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, Blob>({
      method: 'GET',
      responseType: 'blob',
      url: '/api/app/transactions/as-excel-file',
      params: { downloadToken: input.downloadToken, filterText: input.filterText, amountMin: input.amountMin, amountMax: input.amountMax, mainAmountMin: input.mainAmountMin, mainAmountMax: input.mainAmountMax, exchangeRateMin: input.exchangeRateMin, exchangeRateMax: input.exchangeRateMax, isExpense: input.isExpense, paymentType: input.paymentType, basketId: input.basketId, currencyId: input.currencyId },
    },
    { apiName: this.apiName,...config });
  

  getWithNavigationProperties = (id: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, TransactionWithNavigationPropertiesDto>({
      method: 'GET',
      url: `/api/app/transactions/with-navigation-properties/${id}`,
    },
    { apiName: this.apiName,...config });
  

  update = (id: string, input: TransactionUpdateDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, TransactionDto>({
      method: 'PUT',
      url: `/api/app/transactions/${id}`,
      body: input,
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}
