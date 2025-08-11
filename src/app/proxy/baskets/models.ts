import type { FullAuditedEntityDto, PagedAndSortedResultRequestDto } from '@abp/ng.core';
import type { BasketItemDto, BasketItemWithNavigationPropertiesDto } from '../basket-items/models';
import type { CustomerDto } from '../customers/models';

export interface BasketCreateDto extends BasketCreateDtoBase {
}

export interface BasketCreateDtoBase {
  hasInvoice: boolean;
  isIssued: boolean;
  paymentDate?: string;
  customerId?: string;
}

export interface BasketDto extends BasketDtoBase {
}

export interface BasketDtoBase extends FullAuditedEntityDto<string> {
  hasInvoice: boolean;
  isIssued: boolean;
  paymentDate?: string;
  applicationId?: string;
  customerId?: string;
  concurrencyStamp?: string;
  basketItems: BasketItemWithNavigationPropertiesDto[];
}

export interface BasketExcelDownloadDto extends BasketExcelDownloadDtoBase {
}

export interface BasketExcelDownloadDtoBase {
  downloadToken?: string;
  filterText?: string;
  hasInvoice?: boolean;
  isIssued?: boolean;
  paymentDateMin?: string;
  paymentDateMax?: string;
  customerId?: string;
}

export interface BasketHasInvoiceUpdateDto {
  hasInvoice: boolean;
}

export interface BasketIsIssuedUpdateDto {
  isIssued: boolean;
}

export interface BasketPaymentUpdateDto {
  paymentDate?: string;
}

export interface BasketUpdateDto extends BasketUpdateDtoBase {
}

export interface BasketUpdateDtoBase {
  hasInvoice: boolean;
  isIssued: boolean;
  paymentDate?: string;
  customerId?: string;
  concurrencyStamp?: string;
}

export interface BasketWithNavigationPropertiesDto extends BasketWithNavigationPropertiesDtoBase {
}

export interface BasketWithNavigationPropertiesDtoBase {
  basket: BasketDto;
  customer: CustomerDto;
  basketItems: BasketItemDto[];
  paymentSum: number;
  collectionSum: number;
  paymentToCollectionRatio?: number;
}

export interface GetBasketsInput extends GetBasketsInputBase {
}

export interface GetBasketsInputBase extends PagedAndSortedResultRequestDto {
  filterText?: string;
  hasInvoice?: boolean;
  isIssued?: boolean;
  paymentDateMin?: string;
  paymentDateMax?: string;
  customerId?: string;
}
