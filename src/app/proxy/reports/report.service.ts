import type { AgencyApplicationStatsDto, ApplicationProcessingTimeDto, CountryApplicationStatsDto, DailySummaryDto, DashboardSummaryDto, FinancePieChartDto, MainBoardReportDto, MonthlyFinanceOverviewDto, ProductSalesReportDto, SupplierReportDto, VisaTypeStatsDto } from './models';
import { RestService, Rest } from '@abp/ng.core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ReportService {
  apiName = 'Default';
  

  getAgencyApplicationStats = (startDate: string, endDate: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, AgencyApplicationStatsDto[]>({
      method: 'GET',
      url: '/api/app/reports/agency-application-stats',
      params: { startDate, endDate },
    },
    { apiName: this.apiName,...config });
  

  getApplicationProcessingTime = (startDate: string, endDate: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, ApplicationProcessingTimeDto>({
      method: 'GET',
      url: '/api/app/reports/application-processing-time',
      params: { startDate, endDate },
    },
    { apiName: this.apiName,...config });
  

  getCountryApplicationStats = (startDate: string, endDate: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, CountryApplicationStatsDto[]>({
      method: 'GET',
      url: '/api/app/reports/country-application-stats',
      params: { startDate, endDate },
    },
    { apiName: this.apiName,...config });
  

  getDashboardSummary = (config?: Partial<Rest.Config>) =>
    this.restService.request<any, DashboardSummaryDto>({
      method: 'GET',
      url: '/api/app/reports/dashboard-summary',
    },
    { apiName: this.apiName,...config });
  

  getFinancePieChart = (startDate: string, endDate: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, FinancePieChartDto>({
      method: 'GET',
      url: '/api/app/reports/finance-pie',
      params: { startDate, endDate },
    },
    { apiName: this.apiName,...config });
  

  getMainBoardReport = (config?: Partial<Rest.Config>) =>
    this.restService.request<any, MainBoardReportDto[]>({
      method: 'GET',
      url: '/api/app/reports/mainboard-report',
    },
    { apiName: this.apiName,...config });
  

  getMonthlyFinanceOverview = (startDate: string, endDate: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, MonthlyFinanceOverviewDto[]>({
      method: 'GET',
      url: '/api/app/reports/monthly-finance-overview',
      params: { startDate, endDate },
    },
    { apiName: this.apiName,...config });
  

  getMonthlySummary = (startDate: string, endDate: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, DailySummaryDto[]>({
      method: 'GET',
      url: '/api/app/reports/monthly-summary',
      params: { startDate, endDate },
    },
    { apiName: this.apiName,...config });
  

  getProductSalesReport = (startDate: string, endDate: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, ProductSalesReportDto[]>({
      method: 'GET',
      url: '/api/app/reports/product-sales',
      params: { startDate, endDate },
    },
    { apiName: this.apiName,...config });
  

  getSupplierReport = (startDate: string, endDate: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, SupplierReportDto[]>({
      method: 'GET',
      url: '/api/app/reports/supplier-report',
      params: { startDate, endDate },
    },
    { apiName: this.apiName,...config });
  

  getVisaTypeStats = (startDate: string, endDate: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, VisaTypeStatsDto[]>({
      method: 'GET',
      url: '/api/app/reports/visa-type-stats',
      params: { startDate, endDate },
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}
