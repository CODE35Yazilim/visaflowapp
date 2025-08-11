import { ABP, eLayoutType } from '@abp/ng.core';

export const CURRENCY_BASE_ROUTES: ABP.Route[] = [
  {
    path: '/currencies',
    iconClass: 'fas fa-money-bill-wave-alt',
    name: '::Menu:Currencies',
    layout: eLayoutType.application,
    requiredPolicy: 'VisaFlowApp.Currencies',
    breadcrumbText: '::Currencies',
  },
];
