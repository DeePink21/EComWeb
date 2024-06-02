import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RegisterDTO } from '../dtos/user/register.dto';
import { env } from '../environments/environment';
import { HttpUtilService } from './http.util.service';
import { LoginResponse } from '../responses/login.response';
import { RegisterResponse } from '../responses/register.response';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiRegister = `${env.apiBaseUrl}/users/register`;
  private apiLogin = `${env.apiBaseUrl}/users/register`;
  private apiConfig = {
    headers: this.httpUtilService.createHeaders(),
  };

  constructor(
    private http: HttpClient,
    private httpUtilService: HttpUtilService
  ) {}
  register(registerDTO: RegisterDTO): Observable<RegisterResponse> {
    return this.http.post<any>(this.apiRegister, registerDTO, this.apiConfig);
  }

  login(loginDTO: any): Observable<LoginResponse> {
    return this.http.post<any>(this.apiLogin, loginDTO, this.apiConfig);
  }
}
