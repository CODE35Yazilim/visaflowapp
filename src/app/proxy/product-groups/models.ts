import type { FullAuditedEntityDto, PagedAndSortedResultRequestDto } from '@abp/ng.core';
import type { ProductDto } from '../products/models';

export interface GetProductGroupsInput extends GetProductGroupsInputBase {
}

export interface GetProductGroupsInputBase extends PagedAndSortedResultRequestDto {
  filterText?: string;
  name?: string;
  isMain?: boolean;
}

export interface ProductGroupCreateDto extends ProductGroupCreateDtoBase {
}

export interface ProductGroupCreateDtoBase {
  name: string;
  isMain: boolean;
}

export interface ProductGroupDto extends ProductGroupDtoBase {
}

export interface ProductGroupDtoBase extends FullAuditedEntityDto<string> {
  name?: string;
  isMain: boolean;
  concurrencyStamp?: string;
  products: ProductDto[];
}

export interface ProductGroupUpdateDto extends ProductGroupUpdateDtoBase {
}

export interface ProductGroupUpdateDtoBase {
  name: string;
  isMain: boolean;
  concurrencyStamp?: string;
}
