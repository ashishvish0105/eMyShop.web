import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  IApiResponseProduct,
  IApiResponseProductList,
  IProductWrite
} from '../../../../interface/admin/product-management/IProduct.model';
import { environment } from '../../../../../environments/environment';
import { IApiResponseModel } from '../../../../interface/IApiResponseModel';

@Injectable({
  providedIn: 'root'
})
export class ProductManagmentService{
  environment = environment;
  constructor(private http:HttpClient) { }

  create(product: IProductWrite): Observable<IApiResponseProduct> {
    return this.http.post<IApiResponseProduct>(`${this.environment.BaseUrl}Products`, product);
  }

  update(productId: number, product: IProductWrite): Observable<IApiResponseProduct> {
    return this.http.put<IApiResponseProduct>(`${this.environment.BaseUrl}Products/${productId}`, product);
  }

  delete(productId: number): Observable<IApiResponseModel<unknown>> {
    return this.http.delete<IApiResponseModel<unknown>>(`${this.environment.BaseUrl}Products/${productId}`);
  }

  getById(productId: number): Observable<IApiResponseProduct> {
    return this.http.get<IApiResponseProduct>(`${this.environment.BaseUrl}Products/${productId}`);
  }

  getCetegories(): Observable<any> {
    return this.http.get<any>(`${this.environment.BaseUrl}Category/GetCategories`);
  }

  getAll(pageSize = 10, currentPage = 1): Observable<IApiResponseProductList> {
    const params = new HttpParams()
      .set('pageIndex', currentPage)
      .set('totalLength', pageSize);

    return this.http.get<IApiResponseProductList>(`${this.environment.BaseUrl}Products`, { params });
  }
}
