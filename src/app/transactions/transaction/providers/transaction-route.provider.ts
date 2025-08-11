import { inject, provideAppInitializer } from '@angular/core';
import { ABP, RoutesService } from '@abp/ng.core';
import { TRANSACTION_BASE_ROUTES } from './transaction-base.routes';

export const TRANSACTIONS_TRANSACTION_ROUTE_PROVIDER = [
  provideAppInitializer(() => {
    configureRoutes();
  }),
];

function configureRoutes() {
  const routesService = inject(RoutesService);
  const routes: ABP.Route[] = [...TRANSACTION_BASE_ROUTES];
  routesService.add(routes);
}
