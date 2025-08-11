import type { FullAuditedEntityDto, PagedAndSortedResultRequestDto } from '@abp/ng.core';
import type { VisaStatus } from './visa-status.enum';

export interface GetVisaListInput extends PagedAndSortedResultRequestDto {
  applicationId?: string;
}

export interface GetVisasInput extends GetVisasInputBase {
}

export interface GetVisasInputBase extends PagedAndSortedResultRequestDto {
  filterText?: string;
  startDateMin?: string;
  startDateMax?: string;
  validDateMin?: string;
  validDateMax?: string;
  visaStatus?: VisaStatus;
}

export interface VisaCreateDto extends VisaCreateDtoBase {
}

export interface VisaCreateDtoBase {
  applicationId?: string;
  startDate?: string;
  validDate?: string;
  visaStatus?: VisaStatus;
}

export interface VisaDto extends VisaDtoBase {
}

export interface VisaDtoBase extends FullAuditedEntityDto<string> {
  applicationId?: string;
  startDate?: string;
  validDate?: string;
  visaStatus?: VisaStatus;
}

export interface VisaUpdateDto extends VisaUpdateDtoBase {
}

export interface VisaUpdateDtoBase {
  applicationId?: string;
  startDate?: string;
  validDate?: string;
  visaStatus?: VisaStatus;
}
