import { inject, provideAppInitializer } from '@angular/core';
import { ABP, RoutesService } from '@abp/ng.core';
import { PRODUCT_GROUP_BASE_ROUTES } from './product-group-base.routes';

export const PRODUCT_GROUPS_PRODUCT_GROUP_ROUTE_PROVIDER = [
  provideAppInitializer(() => {
    configureRoutes();
  }),
];

function configureRoutes() {
  const routesService = inject(RoutesService);
  const routes: ABP.Route[] = [...PRODUCT_GROUP_BASE_ROUTES];
  routesService.add(routes);
}
