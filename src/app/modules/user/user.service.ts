import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IGetUserApiResponseModel, IUserListApiResponseModel } from '../../interface/user/IUser.Model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}
  // BaseUrl = 'https://localhost:44375/api/';

  // GetUserListData():Observable<IUserListApiResponseModel>{
  //  return this.http.get<IUserListApiResponseModel>(`${environment.BaseUrl}User/GetUserListData`);
  // }

  GetUserListData(): Observable<IUserListApiResponseModel> {
    return this.http.get<IUserListApiResponseModel>(
      `${environment.BaseUrl}User/GetUserListData`
    );
  }

  GetUserData(UserId: number): Observable<IGetUserApiResponseModel> {

    return this.http.get<IGetUserApiResponseModel>(
      `${environment.BaseUrl}User/GetByIdUser?UserId=${UserId}`
    );
  }

  InsertUser(userInfo: any): Observable<IUserListApiResponseModel> {
    return this.http.post<IUserListApiResponseModel>(
      `${environment.BaseUrl}User/InsertUser`,
      userInfo
    );
  }

  UpdatetUser(userInfo: any,userId:number): Observable<IUserListApiResponseModel> {
    return this.http.put<IUserListApiResponseModel>(
      `${environment.BaseUrl}User/UpdateUser?UserId=${userId}`,
      userInfo
    );
  }


  deleteUser(UserId: any): Observable<IUserListApiResponseModel> {
    return this.http.get<IUserListApiResponseModel>(
      `${environment.BaseUrl}User/UserId=${UserId}`
    );
  }
}
