import { inject, provideAppInitializer } from '@angular/core';
import { ABP, RoutesService } from '@abp/ng.core';
import { CURRENCY_BASE_ROUTES } from './currency-base.routes';

export const CURRENCIES_CURRENCY_ROUTE_PROVIDER = [
  provideAppInitializer(() => {
    configureRoutes();
  }),
];

function configureRoutes() {
  const routesService = inject(RoutesService);
  const routes: ABP.Route[] = [...CURRENCY_BASE_ROUTES];
  routesService.add(routes);
}
