import type { CustomerSex } from './customer-sex.enum';
import type { PassportCreateDto, PassportDto } from '../passports/models';
import type { ContactInfoCreateDto, ContactInfoDto } from '../contact-infos/models';
import type { FullAuditedEntityDto, PagedAndSortedResultRequestDto } from '@abp/ng.core';

export interface CustomerCreateDto extends CustomerCreateDtoBase {
}

export interface CustomerCreateDtoBase {
  name: string;
  surname: string;
  maidenName?: string;
  birthPlace: string;
  birthDay?: string;
  identityNo: string;
  nationality: string;
  sex?: CustomerSex;
  passport: PassportCreateDto;
  contactInfos: ContactInfoCreateDto[];
}

export interface CustomerDto extends CustomerDtoBase {
}

export interface CustomerDtoBase extends FullAuditedEntityDto<string> {
  name?: string;
  surname?: string;
  fullName?: string;
  maidenName?: string;
  birthPlace?: string;
  birthDay?: string;
  identityNo?: string;
  nationality?: string;
  sex?: CustomerSex;
  concurrencyStamp?: string;
  passports: PassportDto[];
  contactInfos: ContactInfoDto[];
}

export interface CustomerExcelDownloadDto extends CustomerExcelDownloadDtoBase {
}

export interface CustomerExcelDownloadDtoBase {
  downloadToken?: string;
  filterText?: string;
  name?: string;
  surname?: string;
  birthPlace?: string;
  identityNo?: string;
  nationality?: string;
  sex?: CustomerSex;
}

export interface CustomerUpdateDto extends CustomerUpdateDtoBase {
}

export interface CustomerUpdateDtoBase {
  name: string;
  surname: string;
  maidenName?: string;
  birthPlace: string;
  nationality: string;
  concurrencyStamp?: string;
}

export interface GetCustomersInput extends GetCustomersInputBase {
}

export interface GetCustomersInputBase extends PagedAndSortedResultRequestDto {
  filterText?: string;
  name?: string;
  surname?: string;
  birthPlace?: string;
  identityNo?: string;
  nationality?: string;
  sex?: CustomerSex;
}
