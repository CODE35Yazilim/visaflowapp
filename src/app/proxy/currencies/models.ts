import type { FullAuditedEntityDto, PagedAndSortedResultRequestDto } from '@abp/ng.core';

export interface CurrencyCreateDto extends CurrencyCreateDtoBase {
}

export interface CurrencyCreateDtoBase {
  name: string;
  shorten: string;
  isMain: boolean;
}

export interface CurrencyDto extends CurrencyDtoBase {
}

export interface CurrencyDtoBase extends FullAuditedEntityDto<string> {
  name?: string;
  shorten?: string;
  isMain: boolean;
  concurrencyStamp?: string;
}

export interface CurrencyExcelDownloadDto extends CurrencyExcelDownloadDtoBase {
}

export interface CurrencyExcelDownloadDtoBase {
  downloadToken?: string;
  filterText?: string;
  name?: string;
  shorten?: string;
  isMain?: boolean;
}

export interface CurrencyUpdateDto extends CurrencyUpdateDtoBase {
}

export interface CurrencyUpdateDtoBase {
  name: string;
  shorten: string;
  isMain: boolean;
  concurrencyStamp?: string;
}

export interface GetCurrenciesInput extends GetCurrenciesInputBase {
}

export interface GetCurrenciesInputBase extends PagedAndSortedResultRequestDto {
  filterText?: string;
  name?: string;
  shorten?: string;
  isMain?: boolean;
}
