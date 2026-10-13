import { IApiResponseModel } from './IApiResponseModel';

export interface IFileResponse {
  isSuccess: boolean;
  message: string;
  payLoad: string;
}

export interface ICategoryGetList {
  categoryId: number;
  categoryName: string;
  itemName: string;
  itemdescription: string;
  isvisiable: boolean;
  itemImagePath: string;
}

export interface ICategoryInfo {
  categoryId: number;
  categoryName: string;
  itemName: string;
  itemdescription: string;
  isvisiable: boolean;
  itemImagePath: string;
}


export interface ApiResponseICategoryGetList extends IApiResponseModel {
  payLoad: ICategoryGetList[];
}

export interface ApiResponseIDeleteCategoryItem extends IApiResponseModel {
  payLoad:any;
}


export interface InsertOrUpdateCategory {
  CategoryName: string;
  ItemName: string;
  Itemdescription: string;
  Isvisiable: boolean;
  ItemImage: string;
}

export interface ApiResponseInsertOrUpdateCategory extends IApiResponseModel {
  payload: InsertOrUpdateCategory;
}
