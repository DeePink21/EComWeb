import { Component, ViewChild } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { LoginDTO } from '../../dtos/user/login.dto';
import { LoginResponse } from '../../responses/login.response';
import { TokenService } from '../../services/token.service';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  imports: [
    HeaderComponent,
    FooterComponent,
    FormsModule,
    CommonModule,
    HttpClientModule,
  ],
})
export class LoginComponent {
  onLogin() {
    throw new Error('Method not implemented.');
  }
  onPhoneNumberChange() {
    throw new Error('Method not implemented.');
  }
  @ViewChild('loginForm') loginForm!: NgForm;

  phoneNumber: string = '';
  password: string = '';
  remember: boolean = true;
  constructor(
    private userService: UserService,
    private router: Router,
    private tokenService: TokenService
  ) {
    this.phoneNumber = '';
    this.password = '';
  }

  login() {
    const loginDTO: LoginDTO = {
      phone_number: this.phoneNumber,
      password: this.password,
    };

    console.log(JSON.stringify(loginDTO));

    this.userService.login(loginDTO).subscribe({
      next: (response: LoginResponse) => {
        debugger;
        console.log(response);
        const { token } = response;
        if(this.remember) {
        this.tokenService.setToken(token);
      }
    },
      complete: () => {
        // this.router.navigate(['/']);
      },
      error: (error: any) => {
        debugger
        alert(`Cannot login, error: ${error?.error?.message}`);
      },
    });
  }
}
