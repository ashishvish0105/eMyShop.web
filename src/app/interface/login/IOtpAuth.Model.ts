import { IApiResponseModel } from '../IApiResponseModel';

export interface ISendOtpModel {
  countryCode: string;
  mobileNumber: string;
}

export interface IVerifyOtpModel extends ISendOtpModel {
  otp: string;
}

export interface IOtpUser {
  userId: string;
  fullName: string;
  email: string;
  mobileNumber: string;
  countryCode: string;
  phoneVerified: boolean;
  emailVerified: boolean;
  roles: string[];
  createdAt: string;
  membershipTier?: string;
}

export interface IOtpAuthPayload {
  accessToken: string;
  expiresAt: string;
  user: IOtpUser;
}

export interface ISendOtpPayload {
  expiresInSeconds: number;
  challengeId?: string;
}

export interface ISendOtpApiResponseModel extends IApiResponseModel<ISendOtpPayload> {}
export interface IVerifyOtpApiResponseModel extends IApiResponseModel<IOtpAuthPayload> {}
