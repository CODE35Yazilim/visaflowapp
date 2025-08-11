import type { GetSourcesInput, SourceCreateDto, SourceDto, SourceExcelDownloadDto, SourceUpdateDto } from './models';
import { RestService, Rest } from '@abp/ng.core';
import type { PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import type { DownloadTokenResultDto } from '../shared/models';

@Injectable({
  providedIn: 'root',
})
export class SourceService {
  apiName = 'Default';
  

  create = (input: SourceCreateDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, SourceDto>({
      method: 'POST',
      url: '/api/app/sources',
      body: input,
    },
    { apiName: this.apiName,...config });
  

  delete = (id: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: `/api/app/sources/${id}`,
    },
    { apiName: this.apiName,...config });
  

  deleteAll = (input: GetSourcesInput, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: '/api/app/sources/all',
      params: { filterText: input.filterText, shortName: input.shortName, fullName: input.fullName, phone: input.phone, isOutsource: input.isOutsource, isSupplier: input.isSupplier, address: input.address, taxNo: input.taxNo, taxOffice: input.taxOffice, sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName,...config });
  

  deleteByIds = (sourceIds: string[], config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: '/api/app/sources',
      params: { sourceIds },
    },
    { apiName: this.apiName,...config });
  

  get = (id: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, SourceDto>({
      method: 'GET',
      url: `/api/app/sources/${id}`,
    },
    { apiName: this.apiName,...config });
  

  getDownloadToken = (config?: Partial<Rest.Config>) =>
    this.restService.request<any, DownloadTokenResultDto>({
      method: 'GET',
      url: '/api/app/sources/download-token',
    },
    { apiName: this.apiName,...config });
  

  getList = (input: GetSourcesInput, config?: Partial<Rest.Config>) =>
    this.restService.request<any, PagedResultDto<SourceDto>>({
      method: 'GET',
      url: '/api/app/sources',
      params: { filterText: input.filterText, shortName: input.shortName, fullName: input.fullName, phone: input.phone, isOutsource: input.isOutsource, isSupplier: input.isSupplier, address: input.address, taxNo: input.taxNo, taxOffice: input.taxOffice, sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName,...config });
  

  getListAsExcelFile = (input: SourceExcelDownloadDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, Blob>({
      method: 'GET',
      responseType: 'blob',
      url: '/api/app/sources/as-excel-file',
      params: { downloadToken: input.downloadToken, filterText: input.filterText, shortName: input.shortName, fullName: input.fullName, phone: input.phone, isOutsource: input.isOutsource, isSupplier: input.isSupplier, address: input.address, taxNo: input.taxNo, taxOffice: input.taxOffice },
    },
    { apiName: this.apiName,...config });
  

  update = (id: string, input: SourceUpdateDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, SourceDto>({
      method: 'PUT',
      url: `/api/app/sources/${id}`,
      body: input,
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}
