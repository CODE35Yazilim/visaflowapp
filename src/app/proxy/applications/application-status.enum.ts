import { mapEnumToOptions } from '@abp/ng.core';

export enum ApplicationStatus {
  NoReserved = 0,
  InProgress = 1,
  Ended = 2,
  Canceled = 3,
}

export const applicationStatusOptions = mapEnumToOptions(ApplicationStatus);
