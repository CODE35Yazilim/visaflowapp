import { authGuard, permissionGuard } from '@abp/ng.core';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule),
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule),
    canActivate: [authGuard, permissionGuard],
  },
  {
    path: 'account',
    loadChildren: () =>
      import('@volo/abp.ng.account/public').then(m => m.AccountPublicModule.forLazy()),
  },
  {
    path: 'gdpr',
    loadChildren: () => import('@volo/abp.ng.gdpr').then(m => m.GdprModule.forLazy()),
  },
  {
    path: 'identity',
    loadChildren: () => import('@volo/abp.ng.identity').then(m => m.IdentityModule.forLazy()),
  },
  {
    path: 'saas',
    loadChildren: () => import('@volo/abp.ng.saas').then(m => m.SaasModule.forLazy()),
  },
  {
    path: 'audit-logs',
    loadChildren: () =>
      import('@volo/abp.ng.audit-logging').then(m => m.AuditLoggingModule.forLazy()),
  },
  {
    path: 'openiddict',
    loadChildren: () =>
      import('@volo/abp.ng.openiddictpro').then(m => m.OpeniddictproModule.forLazy()),
  },
  {
    path: 'text-template-management',
    loadChildren: () =>
      import('@volo/abp.ng.text-template-management').then(m =>
        m.TextTemplateManagementModule.forLazy(),
      ),
  },
  {
    path: 'gdpr-cookie-consent',
    loadChildren: () =>
      import('./gdpr-cookie-consent/gdpr-cookie-consent.module').then(
        m => m.GdprCookieConsentModule,
      ),
  },
  {
    path: 'setting-management',
    loadChildren: () =>
      import('@abp/ng.setting-management').then(m => m.SettingManagementModule.forLazy()),
  },
  {
    path: 'customers',
    loadChildren: () => import('./customers/customer/customer.module').then(m => m.CustomerModule),
  },
  {
    path: 'countries',
    loadChildren: () => import('./countries/country/country.module').then(m => m.CountryModule),
  },
  {
    path: 'currencies',
    loadChildren: () => import('./currencies/currency/currency.module').then(m => m.CurrencyModule),
  },
  {
    path: 'sources',
    loadChildren: () => import('./sources/source/source.module').then(m => m.SourceModule),
  },
  {
    path: 'applications',
    loadChildren: () =>
      import('./applications/application/application.module').then(m => m.ApplicationModule),
  },
  {
    path: 'product-groups',
    loadChildren: () =>
      import('./product-groups/product-group/product-group.module').then(m => m.ProductGroupModule),
  },
  {
    path: 'baskets',
    loadChildren: () => import('./baskets/basket/basket.module').then(m => m.BasketModule),
  },
  {
    path: 'transactions',
    loadChildren: () =>
      import('./transactions/transaction/transaction.module').then(m => m.TransactionModule),
  },
  {
  path: 'reports/finance',
  loadComponent: () => import('./reports/finance/finance-reports.component').then(m => m.FinanceReportsComponent)
  }
  ,
  {
  path: 'reports/agent',
  loadComponent: () => import('./reports/agent/agent-report.component').then(m => m.AgentReportsComponent)
  },
  {
  path: 'reports/process',
  loadComponent: () => import('./reports/process/process-reports.component').then(m => m.ProcessReportsComponent)
  }


];

@NgModule({
  imports: [RouterModule.forRoot(routes, {})],
  exports: [RouterModule],
})
export class AppRoutingModule {}
