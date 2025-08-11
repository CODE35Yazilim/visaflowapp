import { mapEnumToOptions } from '@abp/ng.core';

export enum PaymentType {
  Collection = 0,
  Payment = 1,
  Cost = 2,
  Exchange = 3,
}

export const paymentTypeOptions = mapEnumToOptions(PaymentType);
