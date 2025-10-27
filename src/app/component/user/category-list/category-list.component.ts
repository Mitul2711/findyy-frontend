import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BusinessService } from '../../../service/business.service';



export interface Business {
  image: string,
  businessId: number;
  businessName: string;
  description: string;
  website: string;
  phone: string;
  email: string;
  isVerified: boolean;
  status: string;
  avgRating: number;
  reviewCount: number;
  rating: number;
  createdAt: string;
  updatedAt: string;
  isOpen: boolean
  categoryName: string;
  openTime: string;
  closeTime: string;
  location: BusinessLocation;
  hours: BusinessHour[];
}

interface BusinessLocation {
  locationId: number;
  addressLine1: string;
  addressLine2?: string;
  distance: string;
  city: string;
  state: string;
  country: string;
  postalCode?: string;
  latitude?: number;
  longitude?: number;
}

interface BusinessHour {
  businessHourId: number;
  dayOfWeek: string;
  openTime: string;
  closeTime: string;
  isClosed: boolean;
}

@Component({
  selector: 'app-category-list',
  imports: [CommonModule],
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.scss'
})
export class CategoryListComponent {
  category: any;
  businessCount = 0;

  businesses: Business[] = [];

  constructor(private router: Router, private businessService: BusinessService) {
    const navigation = this.router.getCurrentNavigation();
    this.category = navigation?.extras.state?.['category'];
  }

  ngOnInit() {
    this.getBusinessList();
  }

  browseCategories(): void {
    this.router.navigate(['/businesscategory']);
  }

  get filteredBusinesses(): Business[] {
    return this.businesses;
  }

  getBusinessList() {
    let payload = {
      category: this.category.name,
    }
    this.businessService.searchBusiness(payload).subscribe((res: any) => {
      this.businesses = res.status ? res.data : [];
      this.businessCount = this.businesses.length;
      // this.updateBusinessOpenStatusAndFormatHours(this.businesses);
    })
  }

    viewDetails(business: Business): void {
      this.router.navigate(['/businessdetails'], {
        state: { business, isCategoryList: true },
        replaceUrl: true
      });
    }
  
    Review(business: Business): void {
      this.router.navigate(['/businessreview'], {
        state: { business, isCategoryList: true },
        replaceUrl: true
      });
    }
}