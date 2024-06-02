import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { env } from '../environments/environment';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ServiceNameService {
  constructor(private httpClient: HttpClient) {}
  private apiGetRoles = `${env.apiBaseUrl}/roles`;
  getRoles(): Observable<any> {
    return this.httpClient.get<any[]>(this.apiGetRoles);
  }
}
