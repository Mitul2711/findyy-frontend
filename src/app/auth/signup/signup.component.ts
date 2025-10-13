import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { ToastService } from '../../service/toast.service';
import { BusinessService } from '../../service/business.service';

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
  businessCategoryId: number = 0;
  password: string = '';
  confirmPassword: string = '';
  categoryOption: any[] = [];

  constructor(private authService: AuthService, private toastService: ToastService, private businessService: BusinessService) { }

  ngOnInit() {
    this.getCategory();
  }

  getCategory() {
    this.businessService.getBusinessCategory().subscribe((res: any) => {
      this.categoryOption = res.status ? res.data : [];
    })
  }

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
      businessCategoryId: this.businessCategoryId
    }

    this.authService.registerUser(payload).subscribe((res: any) => {
      if (res.status) {
        this.toastService.showSuccess(res.message);
      }
    })
  }
}
