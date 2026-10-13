import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ApiResponseICategoryGetList, ApiResponseIDeleteCategoryItem, ApiResponseInsertOrUpdateCategory } from '../../interface/IFileResponse.model';
import { CATEGORY_URL } from '../../constVariable/categories.const';



@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  constructor(private http: HttpClient) {}

  InsertCategory(
    object: FormData
  ): Observable<ApiResponseInsertOrUpdateCategory> {
     ;
    return this.http.post<ApiResponseInsertOrUpdateCategory>(
      environment.BaseUrl + CATEGORY_URL.INSERT_API,
      object
    );
  }

  UpdateCategory(
    object: FormData,
    categoryId:number
  ): Observable<ApiResponseInsertOrUpdateCategory> {

    return this.http.put<ApiResponseInsertOrUpdateCategory>(
      environment.BaseUrl + CATEGORY_URL.UPDATE_API+categoryId,
      object
    );
  }

  CategoryGetList():Observable<ApiResponseICategoryGetList> {
    return this.http.get<ApiResponseICategoryGetList>(
      environment.BaseUrl + 'api/Profile/CategoryGetList'
    );
  }
  CategoryDelete(catId:number):Observable<ApiResponseICategoryGetList> {
    return this.http.get<ApiResponseICategoryGetList>(
      environment.BaseUrl + 'api/Profile/CategoryGetList'
    );
  }

  DeleteCategoryItem(catId:number):Observable<ApiResponseIDeleteCategoryItem>{
    return this.http.delete<ApiResponseIDeleteCategoryItem>(environment.BaseUrl+"api/Profile/DeleteCategoryItem/"+catId);
  }

}
