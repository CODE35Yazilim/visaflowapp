import { mapEnumToOptions } from '@abp/ng.core';

export enum CommunicationType {
  Phone = 0,
  Adress = 1,
  Email = 2,
}

export const communicationTypeOptions = mapEnumToOptions(CommunicationType);
