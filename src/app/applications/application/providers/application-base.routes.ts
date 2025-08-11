import { ABP, eLayoutType } from '@abp/ng.core';

export const APPLICATION_BASE_ROUTES: ABP.Route[] = [
  {
    path: '/applications',
    iconClass: 'fas fa-file-invoice',
    name: '::Menu:Applications',
    layout: eLayoutType.application,
    requiredPolicy: 'VisaFlowApp.Applications',
    breadcrumbText: '::Applications',
  },
];
