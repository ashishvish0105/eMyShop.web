import { IApiResponseModel } from '../../IApiResponseModel';

export interface IProduct {
  productId: number;
  productName: string;
  description: string;
  categoryId: number;
  typeId: number;
  basePrice: number;
  compareAtPrice: number;
  costPerItem: number;
  status: number;
  brand?: string;
  tags?: string[];
  sku?: string;
  barcode?: string;
  availableQuantity: number;
  totalCount?: number;
}

export type IProductWrite = Omit<IProduct, 'productId' | 'totalCount'>;

export interface IApiResponseProductList extends IApiResponseModel<IProduct[]> {}

export interface IApiResponseProduct extends IApiResponseModel<IProduct> {}
