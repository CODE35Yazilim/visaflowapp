import { ABP, eLayoutType } from '@abp/ng.core';

export const BASKET_BASE_ROUTES: ABP.Route[] = [
  {
    path: '/baskets',
    iconClass: 'fas fa-file-alt',
    name: '::Menu:Baskets',
    layout: eLayoutType.application,
    requiredPolicy: 'VisaFlowApp.Baskets',
    breadcrumbText: '::Baskets',
  },
];
