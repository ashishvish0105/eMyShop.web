import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ILoginApiResponseModel, ILoginModel } from '../interface/login/ILogin.Model';
import { IRegisterApiResponseModel, IRegisterModel } from '../interface/login/IRegister.Model';
import {
  ISendOtpApiResponseModel,
  ISendOtpModel,
  IVerifyOtpApiResponseModel,
  IVerifyOtpModel,
} from '../interface/login/IOtpAuth.Model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }

  Userlogin(UserInfo:ILoginModel):Observable<ILoginApiResponseModel>{
    return this.http.post<ILoginApiResponseModel>(`${environment.BaseUrl}Auth/Login`, UserInfo);
  }

  validateSession(userId: string): Observable<unknown> {
    return this.http.get<unknown>(`${environment.BaseUrl}Auth/${encodeURIComponent(userId)}`);
  }

  register(userInfo: IRegisterModel): Observable<IRegisterApiResponseModel> {
    return this.http.post<IRegisterApiResponseModel>(`${environment.BaseUrl}Auth/register`, userInfo);
  }

  sendOtp(payload: ISendOtpModel): Observable<ISendOtpApiResponseModel> {
    return this.http.post<ISendOtpApiResponseModel>(`${environment.BaseUrl}Auth/SendOtp`, payload);
  }

  verifyOtp(payload: IVerifyOtpModel): Observable<IVerifyOtpApiResponseModel> {
    return this.http.post<IVerifyOtpApiResponseModel>(`${environment.BaseUrl}Auth/VerifyOtp`, payload);
  }

  logoutSession(): Observable<unknown> {
    return this.http.post<unknown>(`${environment.BaseUrl}Auth/Logout`, {});
  }
}
