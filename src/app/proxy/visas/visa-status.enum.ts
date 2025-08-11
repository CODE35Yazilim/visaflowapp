import { mapEnumToOptions } from '@abp/ng.core';

export enum VisaStatus {
  Rejected = 0,
  Accepted = 1,
}

export const visaStatusOptions = mapEnumToOptions(VisaStatus);
