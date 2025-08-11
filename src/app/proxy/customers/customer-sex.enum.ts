import { mapEnumToOptions } from '@abp/ng.core';

export enum CustomerSex {
  Male = 0,
  Female = 1,
}

export const customerSexOptions = mapEnumToOptions(CustomerSex);
