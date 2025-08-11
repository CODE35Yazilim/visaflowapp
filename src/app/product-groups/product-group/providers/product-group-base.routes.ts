import { ABP, eLayoutType } from '@abp/ng.core';

export const PRODUCT_GROUP_BASE_ROUTES: ABP.Route[] = [
  {
    path: '/product-groups',
    iconClass: 'fas fa-layer-group',
    name: '::Menu:ProductGroups',
    layout: eLayoutType.application,
    requiredPolicy: 'VisaFlowApp.ProductGroups',
    breadcrumbText: '::ProductGroups',
  },
];
