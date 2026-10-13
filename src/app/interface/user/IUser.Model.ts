import { Data } from '@angular/router';
import { IApiResponseModel } from '../IApiResponseModel';

export interface IUserModel {
  userID: number;
  firstName: string;
  lastName: string;
  email: string;
  mobileNumber: string;
  address: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
  role: string;
  yearsOfExperience: number;
  skills: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IUserListApiResponseModel extends IApiResponseModel{
  payLoad:IUserModel[]
};

export interface IGetUserApiResponseModel extends IApiResponseModel{
  payLoad:IUserModel
};

export interface IUserApiResponseModel extends IApiResponseModel{
  payLoad:IUserModel
};
