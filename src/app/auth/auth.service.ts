import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ILoginApiResponseModel, ILoginModel } from '../interface/login/ILogin.Model';
import { IRegisterApiResponseModel, IRegisterModel } from '../interface/login/IRegister.Model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }

  Userlogin(UserInfo:ILoginModel):Observable<ILoginApiResponseModel>{
    return this.http.post<ILoginApiResponseModel>(`${environment.BaseUrl}Auth/Login`, UserInfo);
  }

  register(userInfo: IRegisterModel): Observable<IRegisterApiResponseModel> {
    return this.http.post<IRegisterApiResponseModel>(`${environment.BaseUrl}Auth/register`, userInfo);
  }
}
