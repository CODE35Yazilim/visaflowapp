import { CoreModule, provideAbpCore, withOptions } from '@abp/ng.core';
import { provideAbpOAuth } from '@abp/ng.oauth';
import { provideSettingManagementConfig } from '@abp/ng.setting-management/config';
import { provideFeatureManagementConfig } from '@abp/ng.feature-management';
import {
  ThemeSharedModule,
  provideAbpThemeShared,
  withValidationBluePrint,
  withHttpErrorConfig,
} from '@abp/ng.theme.shared';
import { IdentityConfigModule, provideIdentityConfig } from '@volo/abp.ng.identity/config';
import { provideCommercialUiConfig } from '@volo/abp.commercial.ng.ui/config';
import {
  AccountAdminConfigModule,
  provideAccountAdminConfig,
} from '@volo/abp.ng.account/admin/config';
import { provideAccountPublicConfig } from '@volo/abp.ng.account/public/config';
import {
  GdprConfigModule,
  provideGdprConfig,
  withCookieConsentOptions,
} from '@volo/abp.ng.gdpr/config';
import {
  AuditLoggingConfigModule,
  provideAuditLoggingConfig,
} from '@volo/abp.ng.audit-logging/config';
import { registerLocale } from '@abp/ng.core/locale';
import { provideSaasConfig } from '@volo/abp.ng.saas/config';
import { provideTextTemplateManagementConfig } from '@volo/abp.ng.text-template-management/config';
import { provideOpeniddictproConfig } from '@volo/abp.ng.openiddictpro/config';
import { HttpErrorComponent, ThemeLeptonXModule } from '@volosoft/abp.ng.theme.lepton-x';
import { SideMenuLayoutModule } from '@volosoft/abp.ng.theme.lepton-x/layouts';
import { AccountLayoutModule } from '@volosoft/abp.ng.theme.lepton-x/account';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { APP_ROUTE_PROVIDER } from './route.provider';
import { CUSTOMERS_CUSTOMER_ROUTE_PROVIDER } from './customers/customer/providers/customer-route.provider';
import { COUNTRIES_COUNTRY_ROUTE_PROVIDER } from './countries/country/providers/country-route.provider';
import { CURRENCIES_CURRENCY_ROUTE_PROVIDER } from './currencies/currency/providers/currency-route.provider';
import { SOURCES_SOURCE_ROUTE_PROVIDER } from './sources/source/providers/source-route.provider';
import { APPLICATIONS_APPLICATION_ROUTE_PROVIDER } from './applications/application/providers/application-route.provider';
import { PRODUCT_GROUPS_PRODUCT_GROUP_ROUTE_PROVIDER } from './product-groups/product-group/providers/product-group-route.provider';
import { BASKETS_BASKET_ROUTE_PROVIDER } from './baskets/basket/providers/basket-route.provider';
import { TRANSACTIONS_TRANSACTION_ROUTE_PROVIDER } from './transactions/transaction/providers/transaction-route.provider';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ThemeSharedModule,
    CoreModule,
    AccountAdminConfigModule,
    IdentityConfigModule,
    GdprConfigModule,
    AuditLoggingConfigModule,
    ThemeLeptonXModule.forRoot(),
    SideMenuLayoutModule.forRoot(),
    AccountLayoutModule.forRoot(),
  ],
  providers: [
    APP_ROUTE_PROVIDER,
    provideAbpCore(
      withOptions({
        environment,
        registerLocaleFn: registerLocale(),
      }),
    ),
    provideAbpOAuth(),
    provideIdentityConfig(),
    provideSettingManagementConfig(),
    provideFeatureManagementConfig(),
    provideAccountAdminConfig(),
    provideAccountPublicConfig(),
    provideCommercialUiConfig(),
    provideAbpThemeShared(
      withHttpErrorConfig({
        errorScreen: {
          component: HttpErrorComponent,
          forWhichErrors: [401, 403, 404, 500],
          hideCloseIcon: true,
        },
      }),
      withValidationBluePrint({
        wrongPassword: 'Please choose 1q2w3E*',
      }),
    ),
    provideGdprConfig(
      withCookieConsentOptions({
        cookiePolicyUrl: '/gdpr-cookie-consent/cookie',
        privacyPolicyUrl: '/gdpr-cookie-consent/privacy',
      }),
    ),
    provideSaasConfig(),
    provideAuditLoggingConfig(),
    provideOpeniddictproConfig(),
    provideTextTemplateManagementConfig(),
    CUSTOMERS_CUSTOMER_ROUTE_PROVIDER,
    COUNTRIES_COUNTRY_ROUTE_PROVIDER,
    CURRENCIES_CURRENCY_ROUTE_PROVIDER,
    SOURCES_SOURCE_ROUTE_PROVIDER,
    APPLICATIONS_APPLICATION_ROUTE_PROVIDER,
    PRODUCT_GROUPS_PRODUCT_GROUP_ROUTE_PROVIDER,
    BASKETS_BASKET_ROUTE_PROVIDER,
    TRANSACTIONS_TRANSACTION_ROUTE_PROVIDER,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
