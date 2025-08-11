
export interface AgencyApplicationStatsDto {
  agencyId?: string;
  agencyName?: string;
  type?: string;
  totalApplications: number;
  accepted: number;
  rejected: number;
  successRate: number;
}

export interface ApplicationProcessingTimeDto {
  averageDays: number;
  minDays: number;
  maxDays: number;
  count: number;
}

export interface CountryApplicationStatsDto {
  countryId?: string;
  countryName?: string;
  totalApplications: number;
  accepted: number;
  rejected: number;
  successRate: number;
}

export interface DailySummaryDto {
  date?: string;
  newUsers: number;
  newApplications: number;
  newPayments: number;
}

export interface DashboardSummaryDto {
  totalApplications: number;
  inProgressCount: number;
  waitingDocumentCount: number;
  waitingAppointmentCount: number;
  endedOrCanceledCount: number;
  averageEndDurationDays: number;
}

export interface FinancePieChartDto {
  totalCollection: number;
  totalPayment: number;
  totalCost: number;
  remainingReceivables: number;
  profit: number;
}

export interface MainBoardReportDto {
  customerFullName?: string;
  countryName?: string;
  reservationDate?: string;
  reservationTime?: string;
  sourceName?: string;
  outSourceName?: string;
  paymentDate?: string;
  basketItemsTotalEur: number;
  transactionsMainAmount: number;
  hasInvoice: boolean;
  notes?: string;
}

export interface MonthlyFinanceOverviewDto {
  month?: string;
  totalCollection: number;
  collectionCount: number;
  totalPayment: number;
  paymentCount: number;
  totalCost: number;
  costCount: number;
}

export interface ProductSalesReportDto {
  productId?: string;
  productName?: string;
  totalAmount: number;
  totalPieces: number;
}

export interface SupplierReportDto {
  supplierId?: string;
  supplierName?: string;
  totalPaid: number;
  transactionCount: number;
  averageCostPerTransaction: number;
}

export interface VisaTypeStatsDto {
  productGroupId?: string;
  visaTypeName?: string;
  totalApplications: number;
  accepted: number;
  rejected: number;
  successRate: number;
}
