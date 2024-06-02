import { Injectable } from '@angular/core';
import { env } from '../environments/environment';
import { Category } from '../models/category';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  constructor(private httpClient: HttpClient) {}
  private apiGetCategories = `${env.apiBaseUrl}/categories`;

  getCategories(): Observable<Category[]> {
    return this.httpClient.get<Category[]>(this.apiGetCategories);
  }
}
