import type { FullAuditedEntityDto, PagedAndSortedResultRequestDto } from '@abp/ng.core';
import type { ProductDto } from '../products/models';
import type { CurrencyDto } from '../currencies/models';
import type { SourceDto } from '../sources/models';

export interface BasketItemCreateDto extends BasketItemCreateDtoBase {
}

export interface BasketItemCreateDtoBase {
  basketId?: string;
  amount: number;
  piece: number;
  productId?: string;
  currencyId?: string;
  sourceId?: string;
}

export interface BasketItemDto extends BasketItemDtoBase {
}

export interface BasketItemDtoBase extends FullAuditedEntityDto<string> {
  basketId?: string;
  amount: number;
  piece: number;
  productId?: string;
  currencyId?: string;
  sourceId?: string;
}

export interface BasketItemUpdateDto extends BasketItemUpdateDtoBase {
}

export interface BasketItemUpdateDtoBase {
  basketId?: string;
  amount: number;
  piece: number;
  productId?: string;
  currencyId?: string;
  sourceId?: string;
}

export interface BasketItemWithNavigationPropertiesDto extends BasketItemWithNavigationPropertiesDtoBase {
}

export interface BasketItemWithNavigationPropertiesDtoBase {
  basketItem: BasketItemDto;
  product: ProductDto;
  currency: CurrencyDto;
  source: SourceDto;
}

export interface GetBasketItemListInput extends PagedAndSortedResultRequestDto {
  basketId?: string;
}

export interface GetBasketItemsInput extends GetBasketItemsInputBase {
}

export interface GetBasketItemsInputBase extends PagedAndSortedResultRequestDto {
  filterText?: string;
  amountMin?: number;
  amountMax?: number;
  pieceMin?: number;
  pieceMax?: number;
  productId?: string;
  currencyId?: string;
  sourceId?: string;
}
