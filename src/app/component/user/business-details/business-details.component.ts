import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BusinessService } from '../../../service/business.service';

interface BusinessHour {
  id: number;
  businessId: number;
  dayOfWeek: number;
  openTime: string | null;
  closeTime: string | null;
  isClosed: boolean;
}

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

interface Business {
  businessId: number;
  ownerUserId: string;
  businessName: string;
  description?: string;
  website?: string;
  categoryName?: string;
  phone?: string;
  email?: string;
  isVerified: boolean;
  status: number;
  avgRating: number;
  reviewCount: number;
  createdAt: string;
  updatedAt?: string;
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
  selector: 'app-business-details',
  imports: [CommonModule, RouterModule],
  templateUrl: './business-details.component.html',
  styleUrl: './business-details.component.scss'
})

export class BusinessDetailComponent implements OnInit {
  reviews: Review[] = [];
  business!: Business;

  constructor(private router: Router, private businessService: BusinessService) {
    const navigation = this.router.getCurrentNavigation();
    this.business = navigation?.extras.state?.['business'];
    
  }
  
  ngOnInit() {
    this.getBusinessReview();
  }
// Gallery properties
currentGalleryIndex: number = 0;
galleryItemsPerPage: number = 1;

galleryItems = [
  { id: 1, title: 'Office exterior', color: 'bg-teal-50', icon: 'teal' },
  { id: 2, title: 'Team at work', color: 'bg-rose-50', icon: 'rose' },
  { id: 3, title: 'Modern workspace', color: 'bg-teal-50', icon: 'teal' },
  { id: 4, title: 'Technology lab', color: 'bg-rose-50', icon: 'rose' },
  { id: 5, title: 'Conference room', color: 'bg-teal-50', icon: 'teal' },
  { id: 6, title: 'Break area', color: 'bg-rose-50', icon: 'rose' }
];

get maxGalleryIndex(): number {
  return Math.ceil(this.galleryItems.length / this.galleryItemsPerPage) - 1;
}

get galleryDots(): number[] {
  return Array(this.maxGalleryIndex + 1).fill(0);
}

nextSlide(): void {
  this.currentGalleryIndex = this.currentGalleryIndex >= this.maxGalleryIndex ? 0 : this.currentGalleryIndex + 1;
}

prevSlide(): void {
  this.currentGalleryIndex = this.currentGalleryIndex <= 0 ? this.maxGalleryIndex : this.currentGalleryIndex - 1;
}

goToSlide(index: number): void {
  this.currentGalleryIndex = index;
}

getVisibleGalleryItems() {
  const startIdx = this.currentGalleryIndex * this.galleryItemsPerPage;
  return this.galleryItems.slice(startIdx, startIdx + this.galleryItemsPerPage);
}

  getStarArray(): number[] {
    return [1, 2, 3, 4, 5];
  }

  
  getBusinessReview() {
    this.businessService.getBusinessReviewForBusiness(this.business.businessId).subscribe((res: any) => {
      if (res.status) {
        this.reviews = res.data;
      }
    });
  }

  getDayName(dayOfWeek: number): string {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return days[dayOfWeek];
  }

  formatTime(time: string | null): string {
    if (!time) return '';
    const [hours, minutes] = time.split(':');
    const h = parseInt(hours);
    const ampm = h >= 12 ? 'PM' : 'AM';
    const hour12 = h % 12 || 12;
    return `${hour12}:${minutes} ${ampm}`;
  }

  getSortedHours(): BusinessHour[] {
    return this.business?.hours.sort((a, b) => a.dayOfWeek - b.dayOfWeek) || [];
  }

  isToday(dayOfWeek: number): boolean {
    return new Date().getDay() === dayOfWeek;
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

  navigateToChat(business: any) {
    this.router.navigate(['/chat'], {
      state: { business },
      replaceUrl: true
    });
  }

}