import { Environment } from '@abp/ng.core';

const baseUrl = 'http://localhost:4200';

const oAuthConfig = {
  issuer: 'https://localhost:44369/',
  redirectUri: baseUrl,
  clientId: 'VisaFlowApp_App',
  responseType: 'code',
  scope: 'offline_access VisaFlowApp',
  requireHttps: true,
  impersonation: {
    tenantImpersonation: true,
    userImpersonation: true,
  }
};

export const environment = {
  production: true,
  application: {
    baseUrl,
    name: 'VisaFlowApp',
  },
  oAuthConfig,
  apis: {
    default: {
      url: 'https://localhost:44366',
      rootNamespace: 'CODE35.VisaFlowApp',
    },
    AbpAccountPublic: {
      url: oAuthConfig.issuer,
      rootNamespace: 'AbpAccountPublic',
    },
  },
  remoteEnv: {
    url: '/getEnvConfig',
    mergeStrategy: 'deepmerge'
  }
} as Environment;
