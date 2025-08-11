import type { CustomerCreateDto, CustomerDto, CustomerExcelDownloadDto, CustomerUpdateDto, GetCustomersInput } from './models';
import { RestService, Rest } from '@abp/ng.core';
import type { PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import type { DownloadTokenResultDto } from '../shared/models';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  apiName = 'Default';
  

  create = (input: CustomerCreateDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, CustomerDto>({
      method: 'POST',
      url: '/api/app/customers',
      body: input,
    },
    { apiName: this.apiName,...config });
  

  delete = (id: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: `/api/app/customers/${id}`,
    },
    { apiName: this.apiName,...config });
  

  deleteAll = (input: GetCustomersInput, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: '/api/app/customers/all',
      params: { filterText: input.filterText, name: input.name, surname: input.surname, birthPlace: input.birthPlace, identityNo: input.identityNo, nationality: input.nationality, sex: input.sex, sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName,...config });
  

  deleteByIds = (customerIds: string[], config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: '/api/app/customers',
      params: { customerIds },
    },
    { apiName: this.apiName,...config });
  

  get = (id: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, CustomerDto>({
      method: 'GET',
      url: `/api/app/customers/${id}`,
    },
    { apiName: this.apiName,...config });
  

  getDownloadToken = (config?: Partial<Rest.Config>) =>
    this.restService.request<any, DownloadTokenResultDto>({
      method: 'GET',
      url: '/api/app/customers/download-token',
    },
    { apiName: this.apiName,...config });
  

  getList = (input: GetCustomersInput, config?: Partial<Rest.Config>) =>
    this.restService.request<any, PagedResultDto<CustomerDto>>({
      method: 'GET',
      url: '/api/app/customers',
      params: { filterText: input.filterText, name: input.name, surname: input.surname, birthPlace: input.birthPlace, identityNo: input.identityNo, nationality: input.nationality, sex: input.sex, sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName,...config });
  

  getListAsExcelFile = (input: CustomerExcelDownloadDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, Blob>({
      method: 'GET',
      responseType: 'blob',
      url: '/api/app/customers/as-excel-file',
      params: { downloadToken: input.downloadToken, filterText: input.filterText, name: input.name, surname: input.surname, birthPlace: input.birthPlace, identityNo: input.identityNo, nationality: input.nationality, sex: input.sex },
    },
    { apiName: this.apiName,...config });
  

  update = (id: string, input: CustomerUpdateDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, CustomerDto>({
      method: 'PUT',
      url: `/api/app/customers/${id}`,
      body: input,
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}
