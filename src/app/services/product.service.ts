import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/product';
import { HttpClient, HttpParams } from '@angular/common/http';
import { env } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private httpClient: HttpClient) {}
  private apiGetProducts = `${env.apiBaseUrl}/products`;

  getProducts(
    page: number,
    size: number,
    keyword?: string,
    categoryId?: number
  ): Observable<Product[]> {
    const params = new HttpParams()
      .set('search', keyword ?? '')
      .set('categoryId', categoryId?.toString() ?? '0')
      .set('page', page.toString())
      .set('size', size.toString());
    return this.httpClient.get<any[]>(this.apiGetProducts, { params });
  }

  getDetailProduct(id: number): Observable<Product> {
    return this.httpClient.get<Product>(`${this.apiGetProducts}/${id}`);
  }

  getProductsByIds(ids: number[]): Observable<Product[]> {
    // const params = new HttpParams().set('ids', ids?.join(',') ?? '');
    //  .set('ids', ids.map((id) => id.toString()).join(',')?? '');
    const params = new HttpParams().set('ids', '1,2,3,4'); 
    return this.httpClient.get<any[]>(`${this.apiGetProducts}/list`, {
      params,
    });
  }
}
