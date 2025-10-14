import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
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
  selector: 'app-bussinesslist',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './bussinesslist.component.html',
  styleUrl: './bussinesslist.component.scss'
})
export class BussinesslistComponent {
  searchTerm: any;
  location: any;
  showResults = true;
  sortBy = 'recommended';

  businesses: Business[] = [];

  constructor(private router: Router, private route: ActivatedRoute, private businessService: BusinessService) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.searchTerm = params['serviceInput'] || null;
      this.location = params['locationInput'] || null;
    });
    let payload = {
      category: this.searchTerm,
      location: this.location
    }
    this.getBusinessList(payload);

  }

  getBusinessList(payload: any) {
    this.businessService.searchBusiness(payload).subscribe((res: any) => {
      this.businesses = res.status ? res.data : [];
      this.updateBusinessOpenStatusAndFormatHours(this.businesses);
    })
  }

  updateBusinessOpenStatusAndFormatHours(businesses: Business[]): Business[] {
    const now = new Date();
    const currentDay = now.getDay();
    const currentTimeMinutes = now.getHours() * 60 + now.getMinutes();

    return businesses.map(business => {
      const todayHour = business.hours.find(h => Number(h.dayOfWeek) === currentDay);
      business.hours.forEach(h => {
        business.openTime = this.formatTimeAMPM(h.openTime);
        business.closeTime = this.formatTimeAMPM(h.closeTime);
      });

      if (!todayHour || todayHour.isClosed) {
        business.isOpen = false;
        return business;
      }

      const [openH, openM] = todayHour.openTime.split(':').map(Number);
      const [closeH, closeM] = todayHour.closeTime.split(':').map(Number);
      const openMinutes = openH * 60 + openM;
      const closeMinutes = closeH * 60 + closeM;
      business.isOpen = currentTimeMinutes >= openMinutes && currentTimeMinutes <= closeMinutes;

      return business;
    });
  }

  formatTimeAMPM(time: string): string {
    const [hours, minutes] = time.split(':').map(Number);
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const hour12 = hours % 12 || 12; // convert 0 => 12
    return `${hour12}:${minutes.toString().padStart(2, '0')} ${ampm}`;
  }

  get filteredBusinesses(): Business[] {
    return this.businesses;
  }

  get resultCount(): number {
    return this.showResults ? this.filteredBusinesses.length : 0;
  }

  handleSearch(): void {
    let payload = {
      category: this.searchTerm,
      location: this.location
    }
    this.getBusinessList(payload);
    this.showResults = this.searchTerm.trim() !== '';
  }

  viewDetails(business: Business): void {
    this.router.navigate(['/businessdetails'], {
      state: { business },
      replaceUrl: true
    });
  }

  contact(business: Business): void {
    this.router.navigate(['/businessreview']);
    // Add your contact logic here
  }
}
