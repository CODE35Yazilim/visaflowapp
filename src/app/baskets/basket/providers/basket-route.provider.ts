import { inject, provideAppInitializer } from '@angular/core';
import { ABP, RoutesService } from '@abp/ng.core';
import { BASKET_BASE_ROUTES } from './basket-base.routes';

export const BASKETS_BASKET_ROUTE_PROVIDER = [
  provideAppInitializer(() => {
    configureRoutes();
  }),
];

function configureRoutes() {
  const routesService = inject(RoutesService);
  const routes: ABP.Route[] = [...BASKET_BASE_ROUTES];
  routesService.add(routes);
}
