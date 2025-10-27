import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BusinessService } from '../../../service/business.service';
import { AuthService } from '../../../service/auth.service';

interface BusinessLocation {
  id: number;
  businessId: number;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  country: string;
  postalCode?: string;
  latitude: number;
  longitude: number;
}

interface BusinessHour {
  id: number;
  businessId: number;
  dayOfWeek: number;
  openTime?: string;
  closeTime?: string;
  isClosed: boolean;
}

interface Business {
  id: number;
  ownerUserId: string;
  name: string;
  description?: string;
  website?: string;
  category?: string;
  phone?: string;
  email?: string;
  isVerified: boolean;
  status: number;
  avgRating: number;
  reviewCount: number;
  createdAt: Date;
  updatedAt?: Date;
  location?: BusinessLocation;
  hours: BusinessHour[];
}

interface Review {
  id: number;
  name: string;
  ratingStarCount: number;
  reviewDescription: string;
  reviewTitle: string;
  createdAt: Date;
  avatar: string;
}

@Component({
  selector: 'app-business-info',
  imports: [CommonModule],
  templateUrl: './business-info.component.html',
  styleUrl: './business-info.component.scss'
})
export class BusinessInfoComponent {
  business!: Business;
  reviews: Review[] = [];

  constructor(private businessService: BusinessService, private authService: AuthService) { }

  ngOnInit(): void {
    this.getBusinessData();
  }

  getBusinessReview() {
    this.businessService.getBusinessReviewForBusiness(this.business.id).subscribe((res: any) => {
      if (res.status) {
        this.reviews = res.data;
      }
    });
  }

  getBusinessData() {
    this.businessService.getBusinessDataById(this.authService.currentUser().UserId).subscribe((res: any) => {
      if (res.status) {
        this.business = res.data;

        this.getBusinessReview();
      }
    })
  }

  getStatusText(status: number = 0): string {
    const statusMap: { [key: number]: string } = {
      0: 'Hidden',
      1: 'Active',
      2: 'Pending',
      3: 'Blocked'
    };
    return statusMap[status] || 'Unknown';
  }

  getDayName(dayOfWeek: number): string {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return days[dayOfWeek];
  }

  isToday(dayOfWeek: number): boolean {
    const today = new Date().getDay();
    return today === dayOfWeek;
  }

  getTimeAgo(dateInput: string | Date): string {
    const date = typeof dateInput === 'string' ? new Date(dateInput) : dateInput;
    const now = new Date();
    const diff = now.getTime() - date.getTime();

    // Prevent negative values (for future dates)
    if (diff < 0) return 'In the future';

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (days === 0) return 'Today';
    if (days === 1) return 'Yesterday';
    if (days < 7) return `${days} days ago`;
    if (days < 30) return `${Math.floor(days / 7)} weeks ago`;
    if (days < 365) return `${Math.floor(days / 30)} months ago`;
    return `${Math.floor(days / 365)} years ago`;
  }

  getInitials(name: string): string {
    if (!name) return '';
    return name
      .split(' ')
      .filter(part => part.trim() !== '')
      .map(part => part[0].toUpperCase())
      .join('');
  }


}