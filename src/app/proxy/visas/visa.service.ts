import type { GetVisaListInput, GetVisasInput, VisaCreateDto, VisaDto, VisaUpdateDto } from './models';
import { RestService, Rest } from '@abp/ng.core';
import type { PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class VisaService {
  apiName = 'Default';
  

  create = (input: VisaCreateDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, VisaDto>({
      method: 'POST',
      url: '/api/app/visas',
      body: input,
    },
    { apiName: this.apiName,...config });
  

  delete = (id: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: `/api/app/visas/${id}`,
    },
    { apiName: this.apiName,...config });
  

  get = (id: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, VisaDto>({
      method: 'GET',
      url: `/api/app/visas/${id}`,
    },
    { apiName: this.apiName,...config });
  

  getList = (input: GetVisasInput, config?: Partial<Rest.Config>) =>
    this.restService.request<any, PagedResultDto<VisaDto>>({
      method: 'GET',
      url: '/api/app/visas',
      params: { filterText: input.filterText, startDateMin: input.startDateMin, startDateMax: input.startDateMax, validDateMin: input.validDateMin, validDateMax: input.validDateMax, visaStatus: input.visaStatus, sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName,...config });
  

  getListByApplicationId = (input: GetVisaListInput, config?: Partial<Rest.Config>) =>
    this.restService.request<any, PagedResultDto<VisaDto>>({
      method: 'GET',
      url: '/api/app/visas/by-application',
      params: { applicationId: input.applicationId, sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName,...config });
  

  update = (id: string, input: VisaUpdateDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, VisaDto>({
      method: 'PUT',
      url: `/api/app/visas/${id}`,
      body: input,
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}
