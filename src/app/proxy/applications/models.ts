import type { ApplicationStatus } from './application-status.enum';
import type { BasketItemCreateDto } from '../basket-items/models';
import type { FullAuditedEntityDto, PagedAndSortedResultRequestDto } from '@abp/ng.core';
import type { VisaDto } from '../visas/models';
import type { CustomerDto } from '../customers/models';
import type { SourceDto } from '../sources/models';
import type { CountryDto } from '../countries/models';

export interface ApplicationCreateDto extends ApplicationCreateDtoBase {
}

export interface ApplicationCreateDtoBase {
  notes?: string;
  refCode?: string;
  reservationDate?: string;
  reservationTime?: string;
  trackingCode?: string;
  isDocumented: boolean;
  applicationStatus?: ApplicationStatus;
  customerId?: string;
  sourceId?: string;
  outSourceId?: string;
  countryId?: string;
  hasInvoice: boolean;
  basketItems: BasketItemCreateDto[];
}

export interface ApplicationDocumentedUpdateDto {
  isDocumented: boolean;
}

export interface ApplicationDto extends ApplicationDtoBase {
}

export interface ApplicationDtoBase extends FullAuditedEntityDto<string> {
  notes?: string;
  refCode?: string;
  reservationDate?: string;
  reservationTime?: string;
  trackingCode?: string;
  isDocumented: boolean;
  applicationStatus?: ApplicationStatus;
  customerId?: string;
  sourceId?: string;
  outSourceId?: string;
  countryId?: string;
  concurrencyStamp?: string;
  visas: VisaDto[];
}

export interface ApplicationExcelDownloadDto extends ApplicationExcelDownloadDtoBase {
}

export interface ApplicationExcelDownloadDtoBase {
  downloadToken?: string;
  filterText?: string;
  notes?: string;
  refCode?: string;
  reservationDateMin?: string;
  reservationDateMax?: string;
  reservationTimeMin?: string;
  reservationTimeMax?: string;
  trackingCode?: string;
  isDocumented?: boolean;
  applicationStatus?: ApplicationStatus;
  customerId?: string;
  sourceId?: string;
  outSourceId?: string;
  countryId?: string;
}

export interface ApplicationReservationUpdateDto {
  reservationDate: string;
  reservationTime: string;
  trackingCode: string;
  notes?: string;
}

export interface ApplicationUpdateDto extends ApplicationUpdateDtoBase {
}

export interface ApplicationUpdateDtoBase {
  notes?: string;
  refCode?: string;
  reservationDate?: string;
  reservationTime?: string;
  trackingCode?: string;
  isDocumented: boolean;
  applicationStatus?: ApplicationStatus;
  customerId?: string;
  sourceId?: string;
  outSourceId?: string;
  countryId?: string;
  concurrencyStamp?: string;
}

export interface ApplicationWithNavigationPropertiesDto extends ApplicationWithNavigationPropertiesDtoBase {
}

export interface ApplicationWithNavigationPropertiesDtoBase {
  application: ApplicationDto;
  customer: CustomerDto;
  source: SourceDto;
  outSource: SourceDto;
  country: CountryDto;
}

export interface GetApplicationsInput extends GetApplicationsInputBase {
}

export interface GetApplicationsInputBase extends PagedAndSortedResultRequestDto {
  filterText?: string;
  notes?: string;
  refCode?: string;
  reservationDateMin?: string;
  reservationDateMax?: string;
  reservationTimeMin?: string;
  reservationTimeMax?: string;
  trackingCode?: string;
  isDocumented?: boolean;
  applicationStatus?: ApplicationStatus;
  customerId?: string;
  sourceId?: string;
  outSourceId?: string;
  countryId?: string;
}
