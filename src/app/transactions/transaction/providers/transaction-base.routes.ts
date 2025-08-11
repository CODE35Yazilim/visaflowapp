import { ABP, eLayoutType } from '@abp/ng.core';

export const TRANSACTION_BASE_ROUTES: ABP.Route[] = [
  {
    path: '/transactions',
    iconClass: 'fas fa-file-alt',
    name: '::Menu:Transactions',
    layout: eLayoutType.application,
    requiredPolicy: 'VisaFlowApp.Transactions',
    breadcrumbText: '::Transactions',
  },
];
