import type { ApplicationCreateDto, ApplicationDocumentedUpdateDto, ApplicationDto, ApplicationExcelDownloadDto, ApplicationReservationUpdateDto, ApplicationUpdateDto, ApplicationWithNavigationPropertiesDto, GetApplicationsInput } from './models';
import { RestService, Rest } from '@abp/ng.core';
import type { PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import type { DownloadTokenResultDto, LookupDto, LookupRequestDto } from '../shared/models';

@Injectable({
  providedIn: 'root',
})
export class ApplicationService {
  apiName = 'Default';
  

  cancel = (id: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, ApplicationDto>({
      method: 'PUT',
      url: `/api/app/applications/${id}/cancel`,
    },
    { apiName: this.apiName,...config });
  

  complete = (id: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, ApplicationDto>({
      method: 'PUT',
      url: `/api/app/applications/${id}/complete`,
    },
    { apiName: this.apiName,...config });
  

  create = (input: ApplicationCreateDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, ApplicationDto>({
      method: 'POST',
      url: '/api/app/applications',
      body: input,
    },
    { apiName: this.apiName,...config });
  

  delete = (id: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: `/api/app/applications/${id}`,
    },
    { apiName: this.apiName,...config });
  

  deleteAll = (input: GetApplicationsInput, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: '/api/app/applications/all',
      params: { filterText: input.filterText, notes: input.notes, refCode: input.refCode, reservationDateMin: input.reservationDateMin, reservationDateMax: input.reservationDateMax, reservationTimeMin: input.reservationTimeMin, reservationTimeMax: input.reservationTimeMax, trackingCode: input.trackingCode, isDocumented: input.isDocumented, applicationStatus: input.applicationStatus, customerId: input.customerId, sourceId: input.sourceId, outSourceId: input.outSourceId, countryId: input.countryId, sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName,...config });
  

  deleteByIds = (applicationIds: string[], config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: '/api/app/applications',
      params: { applicationIds },
    },
    { apiName: this.apiName,...config });
  

  get = (id: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, ApplicationDto>({
      method: 'GET',
      url: `/api/app/applications/${id}`,
    },
    { apiName: this.apiName,...config });
  

  getCountryLookup = (input: LookupRequestDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, PagedResultDto<LookupDto<string>>>({
      method: 'GET',
      url: '/api/app/applications/country-lookup',
      params: { filter: input.filter, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName,...config });
  

  getCustomerLookup = (input: LookupRequestDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, PagedResultDto<LookupDto<string>>>({
      method: 'GET',
      url: '/api/app/applications/customer-lookup',
      params: { filter: input.filter, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName,...config });
  

  getDownloadToken = (config?: Partial<Rest.Config>) =>
    this.restService.request<any, DownloadTokenResultDto>({
      method: 'GET',
      url: '/api/app/applications/download-token',
    },
    { apiName: this.apiName,...config });
  

  getList = (input: GetApplicationsInput, config?: Partial<Rest.Config>) =>
    this.restService.request<any, PagedResultDto<ApplicationWithNavigationPropertiesDto>>({
      method: 'GET',
      url: '/api/app/applications',
      params: { filterText: input.filterText, notes: input.notes, refCode: input.refCode, reservationDateMin: input.reservationDateMin, reservationDateMax: input.reservationDateMax, reservationTimeMin: input.reservationTimeMin, reservationTimeMax: input.reservationTimeMax, trackingCode: input.trackingCode, isDocumented: input.isDocumented, applicationStatus: input.applicationStatus, customerId: input.customerId, sourceId: input.sourceId, outSourceId: input.outSourceId, countryId: input.countryId, sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName,...config });
  

  getListAsExcelFile = (input: ApplicationExcelDownloadDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, Blob>({
      method: 'GET',
      responseType: 'blob',
      url: '/api/app/applications/as-excel-file',
      params: { downloadToken: input.downloadToken, filterText: input.filterText, notes: input.notes, refCode: input.refCode, reservationDateMin: input.reservationDateMin, reservationDateMax: input.reservationDateMax, reservationTimeMin: input.reservationTimeMin, reservationTimeMax: input.reservationTimeMax, trackingCode: input.trackingCode, isDocumented: input.isDocumented, applicationStatus: input.applicationStatus, customerId: input.customerId, sourceId: input.sourceId, outSourceId: input.outSourceId, countryId: input.countryId },
    },
    { apiName: this.apiName,...config });
  

  getMainProductLookup = (input: LookupRequestDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, PagedResultDto<LookupDto<string>>>({
      method: 'GET',
      url: '/api/app/applications/main-product-lookup',
      params: { filter: input.filter, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName,...config });
  

  getOutSourceLookup = (input: LookupRequestDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, PagedResultDto<LookupDto<string>>>({
      method: 'GET',
      url: '/api/app/applications/out-source-lookup',
      params: { filter: input.filter, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName,...config });
  

  getSourceLookup = (input: LookupRequestDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, PagedResultDto<LookupDto<string>>>({
      method: 'GET',
      url: '/api/app/applications/source-lookup',
      params: { filter: input.filter, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName,...config });
  

  getWithNavigationProperties = (id: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, ApplicationWithNavigationPropertiesDto>({
      method: 'GET',
      url: `/api/app/applications/with-navigation-properties/${id}`,
    },
    { apiName: this.apiName,...config });
  

  setInProgress = (id: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, ApplicationDto>({
      method: 'PUT',
      url: `/api/app/applications/${id}/in-progress`,
    },
    { apiName: this.apiName,...config });
  

  update = (id: string, input: ApplicationUpdateDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, ApplicationDto>({
      method: 'PUT',
      url: `/api/app/applications/${id}`,
      body: input,
    },
    { apiName: this.apiName,...config });
  

  updateDocumented = (id: string, input: ApplicationDocumentedUpdateDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, ApplicationDto>({
      method: 'PUT',
      url: `/api/app/applications/${id}/documented`,
      body: input,
    },
    { apiName: this.apiName,...config });
  

  updateReservation = (id: string, input: ApplicationReservationUpdateDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, ApplicationDto>({
      method: 'PUT',
      url: `/api/app/applications/${id}/reservation`,
      body: input,
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}
