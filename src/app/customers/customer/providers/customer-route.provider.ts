import { inject, provideAppInitializer } from '@angular/core';
import { ABP, RoutesService } from '@abp/ng.core';
import { CUSTOMER_BASE_ROUTES } from './customer-base.routes';

export const CUSTOMERS_CUSTOMER_ROUTE_PROVIDER = [
  provideAppInitializer(() => {
    configureRoutes();
  }),
];

function configureRoutes() {
  const routesService = inject(RoutesService);
  const routes: ABP.Route[] = [...CUSTOMER_BASE_ROUTES];
  routesService.add(routes);
}
