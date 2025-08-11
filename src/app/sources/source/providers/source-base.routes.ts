import { ABP, eLayoutType } from '@abp/ng.core';

export const SOURCE_BASE_ROUTES: ABP.Route[] = [
  {
    path: '/sources',
    iconClass: 'fas fa-handshake',
    name: '::Menu:Sources',
    layout: eLayoutType.application,
    requiredPolicy: 'VisaFlowApp.Sources',
    breadcrumbText: '::Sources',
  },
];
