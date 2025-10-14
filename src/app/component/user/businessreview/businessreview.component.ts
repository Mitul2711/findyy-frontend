import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../service/auth.service';

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
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './businessreview.component.html',
  styleUrl: './businessreview.component.scss'
})
export class BusinessreviewComponent implements OnInit {
  business!: Business;
  reviewForm!: FormGroup;
  hoverRating = 0;
  submitted = false;

  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService) {
    const navigation = this.router.getCurrentNavigation();
    this.business = navigation?.extras?.state?.['business'];
  }

  ngOnInit(): void {
    this.reviewForm = this.fb.group({
      rating: [0, [Validators.required, Validators.min(1)]],
      name: [`${this.authService.currentUser().first_name} ${this.authService.currentUser().last_name}`, Validators.required],
      email: [this.authService.currentUser().email, [Validators.required, Validators.email]],
      title: ['', Validators.required],
      review: ['', Validators.required],
    });
  }

  setRating(rating: number): void {
    this.reviewForm.patchValue({ rating });
  }

  submitReview(): void {
    if (this.reviewForm.invalid) {
      this.reviewForm.markAllAsTouched();
      return;
    }

    console.log('Review Submitted:', this.reviewForm.value);
    this.submitted = true;

    // Reset form after submission
    setTimeout(() => {
      this.reviewForm.reset({ rating: 0 });
      this.hoverRating = 0;
      this.submitted = false;
    }, 2000);
  }
}
