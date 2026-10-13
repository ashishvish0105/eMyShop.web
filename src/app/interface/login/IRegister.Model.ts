import { IApiResponseModel } from '../IApiResponseModel';

export interface IRegisterModel {
  userName: string;
  email: string;
  password: string;
}

export interface IRegisterApiResponseModel extends IApiResponseModel {}
