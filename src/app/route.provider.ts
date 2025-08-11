import { RoutesService, eLayoutType } from '@abp/ng.core';
import { inject, provideAppInitializer } from '@angular/core';

export const APP_ROUTE_PROVIDER = [
  provideAppInitializer(() => {
    configureRoutes();
  }),
];

function configureRoutes() {
  const routes = inject(RoutesService);
  routes.add([
    {
      path: '/',
      name: '::Menu:Home',
      iconClass: 'fas fa-home',
      order: 1,
      layout: eLayoutType.application,
    },
    {
      path: '/dashboard',
      name: '::Menu:Dashboard',
      iconClass: 'fas fa-chart-line',
      order: 2,
      layout: eLayoutType.application,
      requiredPolicy: 'VisaFlowApp.Dashboard.Host  || VisaFlowApp.Dashboard.Tenant',
    },
    {
      path: '/reports',
      name: '::Menu:Reports',
      iconClass: 'fa fa-chart-line',
      order: 60,
      layout: eLayoutType.application,
      requiredPolicy: 'VisaFlowApp.Dashboard.Host  || VisaFlowApp.Dashboard.Tenant',
    },
    {
      path: '/reports/finance',
      name: '::Menu:FinancialReports',
      parentName: '::Menu:Reports',
      order: 1,
      layout: eLayoutType.application,
      requiredPolicy: 'VisaFlowApp.Dashboard.Host  || VisaFlowApp.Dashboard.Tenant',
    },
    {
      path: '/reports/agent',
      name: '::Menu:AgencyReports',
      parentName: '::Menu:Reports',
      order: 2,
      layout: eLayoutType.application,
      requiredPolicy: 'VisaFlowApp.Dashboard.Host  || VisaFlowApp.Dashboard.Tenant',
    },
    {
      path: '/reports/process',
      name: '::Menu:ProcessReports',
      parentName: '::Menu:Reports',
      order: 3,
      layout: eLayoutType.application,
      requiredPolicy: 'VisaFlowApp.Dashboard.Host  || VisaFlowApp.Dashboard.Tenant',
    },
  ]);
}
