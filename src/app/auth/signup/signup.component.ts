import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { ToastService } from '../../service/toast.service';

@Component({
  selector: 'app-signup',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
  providers: [AuthService]
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

  constructor(private authService: AuthService, private toastService: ToastService) { }

  onSubmit() {

    if (this.password !== this.confirmPassword) {
      this.toastService.showError('Passwords do not match!');
      return;
    }
    let payload = {
      role: this.accountType,
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      phone: this.phone,
      city: this.city,
      password: this.password,
      businessName: this.businessName,
      businessCategory: this.businessCategory
    }

    this.authService.registerUser(payload).subscribe((res: any) => {
      if (res.status) {
        this.toastService.showSuccess(res.message);
      }
    })
  }
}
