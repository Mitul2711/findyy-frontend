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
  customerName: string;
  rating: number;
  comment: string;
  date: Date;
  avatar: string;
}

@Component({
  selector: 'app-business-info',
  imports: [CommonModule],
  templateUrl: './business-info.component.html',
  styleUrl: './business-info.component.scss'
})
export class BusinessInfoComponent {
business: Business = {
    id: 1,
    ownerUserId: 'guid-123',
    name: 'ABC Plumbing Services',
    description: 'Professional plumbing services with over 15 years of experience. We specialize in residential and commercial plumbing, emergency repairs, installations, and maintenance. Our licensed plumbers are available 24/7 to handle all your plumbing needs with quality workmanship and competitive pricing.',
    website: 'https://abcplumbing.com',
    category: 'Plumbing',
    phone: '+1 (555) 123-4567',
    email: 'contact@abcplumbing.com',
    isVerified: true,
    status: 1,
    avgRating: 4.8,
    reviewCount: 127,
    createdAt: new Date('2023-01-15'),
    updatedAt: new Date('2024-10-01'),
    location: {
      id: 1,
      businessId: 1,
      addressLine1: '123 Main Street',
      addressLine2: 'Suite 200',
      city: 'Springfield',
      state: 'IL',
      country: 'USA',
      postalCode: '62701',
      latitude: 39.7817,
      longitude: -89.6501
    },
    hours: [
      { id: 1, businessId: 1, dayOfWeek: 0, openTime: undefined, closeTime: undefined, isClosed: true },
      { id: 2, businessId: 1, dayOfWeek: 1, openTime: '08:00 AM', closeTime: '06:00 PM', isClosed: false },
      { id: 3, businessId: 1, dayOfWeek: 2, openTime: '08:00 AM', closeTime: '06:00 PM', isClosed: false },
      { id: 4, businessId: 1, dayOfWeek: 3, openTime: '08:00 AM', closeTime: '06:00 PM', isClosed: false },
      { id: 5, businessId: 1, dayOfWeek: 4, openTime: '08:00 AM', closeTime: '06:00 PM', isClosed: false },
      { id: 6, businessId: 1, dayOfWeek: 5, openTime: '08:00 AM', closeTime: '06:00 PM', isClosed: false },
      { id: 7, businessId: 1, dayOfWeek: 6, openTime: '09:00 AM', closeTime: '02:00 PM', isClosed: false }
    ]
  };

  reviews: Review[] = [
    {
      id: 1,
      customerName: 'John Smith',
      rating: 5,
      comment: 'Excellent service! They arrived on time and fixed our leaking pipe quickly. Very professional and reasonably priced. Highly recommend!',
      date: new Date('2024-10-01'),
      avatar: 'JS'
    },
    {
      id: 2,
      customerName: 'Sarah Johnson',
      rating: 5,
      comment: 'Called them for an emergency repair on Sunday. They came within an hour and had everything fixed in no time. Great customer service!',
      date: new Date('2024-09-28'),
      avatar: 'SJ'
    },
    {
      id: 3,
      customerName: 'Michael Brown',
      rating: 4,
      comment: 'Good work overall. The plumber was knowledgeable and explained everything clearly. Only minor issue was they arrived 20 minutes late.',
      date: new Date('2024-09-25'),
      avatar: 'MB'
    },
    {
      id: 4,
      customerName: 'Emily Davis',
      rating: 5,
      comment: 'Had them install a new water heater. The team was professional, clean, and efficient. Very happy with the result!',
      date: new Date('2024-09-20'),
      avatar: 'ED'
    },
    {
      id: 5,
      customerName: 'Robert Wilson',
      rating: 4,
      comment: 'Solid service and fair pricing. They diagnosed the problem quickly and gave me multiple options for repair.',
      date: new Date('2024-09-15'),
      avatar: 'RW'
    }
  ];

  constructor(private businessService: BusinessService, private authService: AuthService) {}

  ngOnInit(): void {
    this.getBusinessData();
  }

  getBusinessData() {
    this.businessService.getBusinessDataById(this.authService.currentUser().UserId).subscribe((res: any) => {
      if(res.status) {
        this.business = res.data;
      }
    })
  }

  getStatusText(status: number): string {
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

  getTimeAgo(date: Date): string {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    if (days === 0) return 'Today';
    if (days === 1) return 'Yesterday';
    if (days < 7) return `${days} days ago`;
    if (days < 30) return `${Math.floor(days / 7)} weeks ago`;
    if (days < 365) return `${Math.floor(days / 30)} months ago`;
    return `${Math.floor(days / 365)} years ago`;
  }
}