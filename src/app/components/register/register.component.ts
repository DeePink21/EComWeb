import { Component, ViewChild } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {
  HttpClient,
  HttpClientModule,
  HttpHeaders,
} from '@angular/common/http';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { RegisterDTO } from '../../dtos/user/register.dto';
import { RegisterResponse } from '../../responses/register.response';

@Component({
  selector: 'app-register',
  standalone: true,
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
  imports: [
    FooterComponent,
    HeaderComponent,
    FormsModule,
    CommonModule,
    HttpClientModule,
  ],
})
export class RegisterComponent {
  // declare the register form
  @ViewChild('registerForm') registerForm!: NgForm;

  phoneNumber: string;
  password: string;
  retypePassword: string;
  fullname: string;
  address: string;
  isAccepted: boolean;
  dateOfBirth: Date;
  constructor(private userService: UserService, private router: Router) {
    this.phoneNumber = '0911502365';
    this.password = '123456';
    this.retypePassword = '123456';
    this.fullname = 'Truong Vo';
    this.address = 'CMT8 HCM';
    this.isAccepted = true;
    this.dateOfBirth = new Date();
    this.dateOfBirth.setFullYear(this.dateOfBirth.getFullYear() - 18);
  }

  onPhoneNumberChange() {}

  register() {
    const registerDTO: RegisterDTO = {
      phone_number: this.phoneNumber,
      password: this.password,
      retype_password: this.retypePassword,
      fullname: this.fullname,
      address: this.address,
      date_of_birth: this.dateOfBirth,
      facebook_account_id: '',
      google_account_id: '',
      role_id: 1,
    };

    console.log(JSON.stringify(registerDTO));

    this.userService.register(registerDTO).subscribe({
      next: (response: RegisterResponse) => {
        console.log(response);
        this.router.navigate(['/login']);
      },
      complete: () => {
        this.router.navigate(['/login']);
      },
      error: (error) => {
        console.error(error);
        alert(`Cannot register, error: ${error.error}`);
      },
    });
  }
  onDateOfBirthChange() {
    throw new Error('Method not implemented.');
  }

  // check if the user is over 18
  checkAge() {
    if (this.dateOfBirth) {
      const today = new Date();
      const birthday = new Date(this.dateOfBirth);
      let age = today.getFullYear() - birthday.getFullYear();
      const monthDiff = today.getMonth() - birthday.getMonth();
      if (
        monthDiff < 0 ||
        (monthDiff === 0 && today.getDay() < birthday.getDay())
      ) {
        age--;
      }

      if (age < 18) {
        this.registerForm.form.controls['dateOfBirth'].setErrors({
          invalidAge: true,
        });
      } else {
        this.registerForm.form.controls['dateOfBirth'].setErrors(null);
      }
    }
  }
}
