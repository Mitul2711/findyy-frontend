import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-signup',
    imports: [CommonModule, FormsModule, RouterModule],
templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
 accountType: 'customer' | 'business' = 'customer';
  firstName: string = '';
  lastName: string = '';
  email: string = '';
  phone: string = '';
  city: string = '';
  businessName: string = '';
  businessCategory: string = '';
  password: string = '';
  confirmPassword: string = '';

  onSubmit() {
    console.log('Sign up attempt:', {
      accountType: this.accountType,
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      phone: this.phone,
      city: this.city,
      businessName: this.businessName,
      businessCategory: this.businessCategory
    });
  }
}
