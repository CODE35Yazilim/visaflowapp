import { inject, provideAppInitializer } from '@angular/core';
import { ABP, RoutesService } from '@abp/ng.core';
import { APPLICATION_BASE_ROUTES } from './application-base.routes';

export const APPLICATIONS_APPLICATION_ROUTE_PROVIDER = [
  provideAppInitializer(() => {
    configureRoutes();
  }),
];

function configureRoutes() {
  const routesService = inject(RoutesService);
  const routes: ABP.Route[] = [...APPLICATION_BASE_ROUTES];
  routesService.add(routes);
}
