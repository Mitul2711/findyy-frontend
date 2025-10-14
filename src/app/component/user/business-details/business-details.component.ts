import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

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
  id: number;
  ownerUserId: string;
  businessName: string;
  description?: string;
  website?: string;
  category?: string;
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

@Component({
  selector: 'app-business-details',
  imports: [CommonModule],
  templateUrl: './business-details.component.html',
  styleUrl: './business-details.component.scss'
})

export class BusinessDetailComponent implements OnInit {
  // business: Business | null = null;

  business: Business | undefined;

  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    this.business = navigation?.extras.state?.['business'];
    console.log(this.business);
    
  }
  
  ngOnInit() {
    // // Mock data - replace with actual API call
    // this.business = {
    //   id: 1,
    //   ownerUserId: '123e4567-e89b-12d3-a456-426614174000',
    //   name: 'ABC Plumbing Services',
    //   description: 'Professional plumbing services with over 15 years of experience. We specialize in residential and commercial plumbing, emergency repairs, installations, and maintenance. Our licensed plumbers are available 24/7 to handle all your plumbing needs with quality workmanship and competitive pricing.',
    //   website: 'https://www.abcplumbing.com',
    //   category: 'Plumbing',
    //   phone: '+1 (555) 123-4567',
    //   email: 'contact@abcplumbing.com',
    //   isVerified: true,
    //   status: 1,
    //   avgRating: 4.8,
    //   reviewCount: 127,
    //   createdAt: '2024-01-15T10:30:00Z',
    //   updatedAt: '2024-10-01T14:20:00Z',
    //   location: {
    //     id: 1,
    //     businessId: 1,
    //     addressLine1: '123 Main Street',
    //     addressLine2: 'Suite 200',
    //     city: 'Springfield',
    //     state: 'IL',
    //     country: 'USA',
    //     postalCode: '62701',
    //     latitude: 39.7817,
    //     longitude: -89.6501
    //   },
    //   hours: [
    //     { id: 1, businessId: 1, dayOfWeek: 0, openTime: null, closeTime: null, isClosed: true },
    //     { id: 2, businessId: 1, dayOfWeek: 1, openTime: '08:00:00', closeTime: '18:00:00', isClosed: false },
    //     { id: 3, businessId: 1, dayOfWeek: 2, openTime: '08:00:00', closeTime: '18:00:00', isClosed: false },
    //     { id: 4, businessId: 1, dayOfWeek: 3, openTime: '08:00:00', closeTime: '18:00:00', isClosed: false },
    //     { id: 5, businessId: 1, dayOfWeek: 4, openTime: '08:00:00', closeTime: '18:00:00', isClosed: false },
    //     { id: 6, businessId: 1, dayOfWeek: 5, openTime: '08:00:00', closeTime: '18:00:00', isClosed: false },
    //     { id: 7, businessId: 1, dayOfWeek: 6, openTime: '09:00:00', closeTime: '14:00:00', isClosed: false }
    //   ]
    // };
  }

  getStarArray(): number[] {
    return [1, 2, 3, 4, 5];
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
}