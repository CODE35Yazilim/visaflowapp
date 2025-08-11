import type { GetPassportListInput, GetPassportsInput, PassportCreateDto, PassportDto, PassportUpdateDto } from './models';
import { RestService, Rest } from '@abp/ng.core';
import type { PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PassportService {
  apiName = 'Default';
  

  create = (input: PassportCreateDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, PassportDto>({
      method: 'POST',
      url: '/api/app/passports',
      body: input,
    },
    { apiName: this.apiName,...config });
  

  delete = (id: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: `/api/app/passports/${id}`,
    },
    { apiName: this.apiName,...config });
  

  get = (id: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, PassportDto>({
      method: 'GET',
      url: `/api/app/passports/${id}`,
    },
    { apiName: this.apiName,...config });
  

  getList = (input: GetPassportsInput, config?: Partial<Rest.Config>) =>
    this.restService.request<any, PagedResultDto<PassportDto>>({
      method: 'GET',
      url: '/api/app/passports',
      params: { filterText: input.filterText, number: input.number, isMain: input.isMain, startDateMin: input.startDateMin, startDateMax: input.startDateMax, validDateMin: input.validDateMin, validDateMax: input.validDateMax, issuedBy: input.issuedBy, state: input.state, sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName,...config });
  

  getListByCustomerId = (input: GetPassportListInput, config?: Partial<Rest.Config>) =>
    this.restService.request<any, PagedResultDto<PassportDto>>({
      method: 'GET',
      url: '/api/app/passports/by-customer',
      params: { customerId: input.customerId, sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName,...config });
  

  update = (id: string, input: PassportUpdateDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, PassportDto>({
      method: 'PUT',
      url: `/api/app/passports/${id}`,
      body: input,
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}
