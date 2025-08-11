import type { CommunicationType } from '../customers/communication-type.enum';
import type { FullAuditedEntityDto, PagedAndSortedResultRequestDto } from '@abp/ng.core';

export interface ContactInfoCreateDto extends ContactInfoCreateDtoBase {
}

export interface ContactInfoCreateDtoBase {
  customerId?: string;
  type?: CommunicationType;
  name: string;
}

export interface ContactInfoDto extends ContactInfoDtoBase {
}

export interface ContactInfoDtoBase extends FullAuditedEntityDto<string> {
  customerId?: string;
  type?: CommunicationType;
  name?: string;
}

export interface ContactInfoUpdateDto extends ContactInfoUpdateDtoBase {
}

export interface ContactInfoUpdateDtoBase {
  customerId?: string;
  type?: CommunicationType;
  name: string;
}

export interface GetContactInfoListInput extends PagedAndSortedResultRequestDto {
  customerId?: string;
}

export interface GetContactInfosInput extends GetContactInfosInputBase {
}

export interface GetContactInfosInputBase extends PagedAndSortedResultRequestDto {
  filterText?: string;
  type?: CommunicationType;
  name?: string;
}
