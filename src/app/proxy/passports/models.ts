import type { FullAuditedEntityDto, PagedAndSortedResultRequestDto } from '@abp/ng.core';

export interface GetPassportListInput extends PagedAndSortedResultRequestDto {
  customerId?: string;
}

export interface GetPassportsInput extends GetPassportsInputBase {
}

export interface GetPassportsInputBase extends PagedAndSortedResultRequestDto {
  filterText?: string;
  number?: string;
  isMain?: boolean;
  startDateMin?: string;
  startDateMax?: string;
  validDateMin?: string;
  validDateMax?: string;
  issuedBy?: string;
  state?: string;
}

export interface PassportCreateDto extends PassportCreateDtoBase {
}

export interface PassportCreateDtoBase {
  customerId?: string;
  number: string;
  isMain: boolean;
  startDate?: string;
  validDate?: string;
  issuedBy: string;
  state: string;
}

export interface PassportDto extends PassportDtoBase {
}

export interface PassportDtoBase extends FullAuditedEntityDto<string> {
  customerId?: string;
  number?: string;
  isMain: boolean;
  startDate?: string;
  validDate?: string;
  issuedBy?: string;
  state?: string;
}

export interface PassportUpdateDto extends PassportUpdateDtoBase {
}

export interface PassportUpdateDtoBase {
  customerId?: string;
  number: string;
  isMain: boolean;
  startDate?: string;
  validDate?: string;
  issuedBy: string;
  state: string;
}
