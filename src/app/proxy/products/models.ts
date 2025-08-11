import type { FullAuditedEntityDto, PagedAndSortedResultRequestDto } from '@abp/ng.core';

export interface GetProductListInput extends PagedAndSortedResultRequestDto {
  productGroupId?: string;
}

export interface GetProductsInput extends GetProductsInputBase {
}

export interface GetProductsInputBase extends PagedAndSortedResultRequestDto {
  filterText?: string;
  name?: string;
}

export interface ProductCreateDto extends ProductCreateDtoBase {
}

export interface ProductCreateDtoBase {
  productGroupId?: string;
  name: string;
}

export interface ProductDto extends ProductDtoBase {
}

export interface ProductDtoBase extends FullAuditedEntityDto<string> {
  productGroupId?: string;
  name?: string;
}

export interface ProductUpdateDto extends ProductUpdateDtoBase {
}

export interface ProductUpdateDtoBase {
  productGroupId?: string;
  name: string;
}
