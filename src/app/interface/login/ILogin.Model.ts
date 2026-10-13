import { IApiResponseModel } from '../IApiResponseModel';

export interface ILoginModel {
  userName: string;
  email: string;
  password: string;
}

export interface ILoginPayload {
  accessToken: string;
  expiresAt: string;
  user: {
    userId: string;
    userName: string;
    email: string;
    roles: string[];
  };
}

export interface ILoginApiResponseModel extends IApiResponseModel<ILoginPayload> {}

export interface Ilogintype {
  customer: string;
  seller: string;
}
