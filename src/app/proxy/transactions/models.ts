import type { FullAuditedEntityDto, PagedAndSortedResultRequestDto } from '@abp/ng.core';
import type { PaymentType } from './payment-type.enum';
import type { BasketDto } from '../baskets/models';
import type { CurrencyDto } from '../currencies/models';

export interface CreateTransactionAmountCurrencyDto {
  amount: number;
  currencyId?: string;
}

export interface CurrencyConvertDto {
  sourceCurrencyId?: string;
  targetCurrencyId?: string;
  amount: number;
}

export interface GetTransactionsInput extends GetTransactionsInputBase {
}

export interface GetTransactionsInputBase extends PagedAndSortedResultRequestDto {
  filterText?: string;
  amountMin?: number;
  amountMax?: number;
  mainAmountMin?: number;
  mainAmountMax?: number;
  exchangeRateMin?: number;
  exchangeRateMax?: number;
  isExpense?: boolean;
  paymentType?: PaymentType;
  basketId?: string;
  currencyId?: string;
}

export interface TransactionCreateDto extends TransactionCreateDtoBase {
}

export interface TransactionCreateDtoBase {
  amount?: number;
  mainAmount?: number;
  exchangeRate?: number;
  isExpense: boolean;
  paymentType?: PaymentType;
  basketId?: string;
  currencyId?: string;
}

export interface TransactionDto extends TransactionDtoBase {
}

export interface TransactionDtoBase extends FullAuditedEntityDto<string> {
  amount?: number;
  mainAmount?: number;
  exchangeRate?: number;
  isExpense: boolean;
  paymentType?: PaymentType;
  basketId?: string;
  currencyId?: string;
  concurrencyStamp?: string;
}

export interface TransactionExcelDownloadDto extends TransactionExcelDownloadDtoBase {
}

export interface TransactionExcelDownloadDtoBase {
  downloadToken?: string;
  filterText?: string;
  amountMin?: number;
  amountMax?: number;
  mainAmountMin?: number;
  mainAmountMax?: number;
  exchangeRateMin?: number;
  exchangeRateMax?: number;
  isExpense?: boolean;
  paymentType?: PaymentType;
  basketId?: string;
  currencyId?: string;
}

export interface TransactionUpdateDto extends TransactionUpdateDtoBase {
}

export interface TransactionUpdateDtoBase {
  amount?: number;
  mainAmount?: number;
  exchangeRate?: number;
  isExpense: boolean;
  paymentType?: PaymentType;
  basketId?: string;
  currencyId?: string;
  concurrencyStamp?: string;
}

export interface TransactionWithNavigationPropertiesDto extends TransactionWithNavigationPropertiesDtoBase {
}

export interface TransactionWithNavigationPropertiesDtoBase {
  transaction: TransactionDto;
  basket: BasketDto;
  currency: CurrencyDto;
}
