import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../service/auth.service';
import { BusinessService } from '../../../service/business.service';
import { ToastService } from '../../../service/toast.service';

interface BusinessHour {
  dayOfWeek: string;
  openTime: string;
  closeTime: string;
  isClosed: boolean;
}

interface Business {
  businessId: number;
  businessName: string;
  categoryName: string;
  phone: string;
  website: string;
  location: {
    addressLine1: string;
    addressLine2?: string;
    city: string;
    state: string;
    country: string;
    postalCode?: string;
  };
  hours: BusinessHour[];
  isOpen?: boolean;
}

@Component({
  selector: 'app-businessreview',
  imports: [CommonModule, ReactiveFormsModule, RouterModule, RouterModule],
  templateUrl: './businessreview.component.html',
  styleUrl: './businessreview.component.scss'
})
export class BusinessreviewComponent implements OnInit {
  business!: Business;
  reviewForm!: FormGroup;
  hoverRating = 0;
  submitted = false;

  constructor(private fb: FormBuilder, private router: Router, private toastService: ToastService,
     private authService: AuthService, private businessService: BusinessService) {
    const navigation = this.router.getCurrentNavigation();
    this.business = navigation?.extras?.state?.['business'];
  }

  ngOnInit(): void {
    this.getReview();
    this.reviewForm = this.fb.group({
      ratingStarCount: [0, [Validators.required, Validators.min(1)]],
      name: [`${this.authService.currentUser().first_name} ${this.authService.currentUser().last_name}`, Validators.required],
      email: [this.authService.currentUser().email, [Validators.required, Validators.email]],
      reviewTitle: ['', Validators.required],
      reviewDescription: ['', Validators.required],
    });
  }

  getReview() {
    this.businessService.getBusinessReviewForUser(this.authService.currentUser().UserId).subscribe((res: any) => {
      if(res.status) {
        this.reviewForm.patchValue(res.data[0]);
      }
    })
  }

  setRating(ratingStarCount: number): void {
    this.reviewForm.get('ratingStarCount')?.setValue(ratingStarCount);
  }

  submitReview(): void {
    if (this.reviewForm.invalid) {
      this.reviewForm.markAllAsTouched();
      return;
    }

    let payload = {
      ...this.reviewForm.value,
      createdBy: this.authService.currentUser().UserId,
      updatedBy: this.authService.currentUser().UserId,
      businessId: this.business.businessId
    }
    this.businessService.addBusinessReview(payload).subscribe({
      next: (res: any) => {
        this.toastService.showSuccess(res.message);
        this.getReview();
      },
      error: (err) => {
        this.toastService.showError(err);
      }
    });
  }
}
