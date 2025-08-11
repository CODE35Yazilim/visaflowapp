import { inject, provideAppInitializer } from '@angular/core';
import { ABP, RoutesService } from '@abp/ng.core';
import { SOURCE_BASE_ROUTES } from './source-base.routes';

export const SOURCES_SOURCE_ROUTE_PROVIDER = [
  provideAppInitializer(() => {
    configureRoutes();
  }),
];

function configureRoutes() {
  const routesService = inject(RoutesService);
  const routes: ABP.Route[] = [...SOURCE_BASE_ROUTES];
  routesService.add(routes);
}
