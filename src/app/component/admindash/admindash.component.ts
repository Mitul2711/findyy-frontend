import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BusinessService } from '../../service/business.service';
import { ToastService } from '../../service/toast.service';

interface BusinessHours {
  dayOfWeek: number;
  openTime: string;
  closeTime: string;
  isClosed: boolean;
}

interface Business {
  id: string;
  name: string;
  category: string;
  description: string;
  website: string;
  email: string;
  phone: string;
  location: BusinessLocation,
  hours: BusinessHours[];
  status: 0 | 1 | 2 | 3;
  createdAt: Date;
}

interface BusinessLocation {
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
  latitude: string;
  longitude: string;
}

@Component({
  selector: 'app-admindash',
  imports: [CommonModule, FormsModule],
  templateUrl: './admindash.component.html',
  styleUrl: './admindash.component.scss'
})
export class AdmindashComponent {

  filterStatus: number = 5;
  selectedBusiness: Business | null = null;
  adminNotes: { [key: string]: string } = {};

  tabs = [
    { label: 'All', value: 5 },
    { label: 'Pending', value: 0 },
    { label: 'Verified', value: 1 },
    { label: 'Rejected', value: 2 }
  ];

  // businesses: Business[] = [
  //   {
  //     id: '1',
  //     name: 'John Solutions',
  //     category: 'IT',
  //     description: 'John Solutions is a forward-thinking IT services company dedicated to providing innovative technology solutions for businesses of all sizes. We specialize in software development, IT consulting, and digital transformation strategies that help organizations streamline operations, enhance efficiency, and achieve their business goals. Our mission is to deliver customized, reliable, and scalable solutions while maintaining exceptional customer support and technical expertise.',
  //     website: '703infolabs.com',
  //     email: 'johnsolutions@gmail.com',
  //     phone: '7895496332',
  //     address1: 'test',
  //     address2: 'test',
  //     city: 'Ahmedabad',
  //     state: 'Gujarat',
  //     country: 'India',
  //     postalCode: '380063',
  //     latitude: '75.3598',
  //     longitude: '-84.3541',
  //     hours: [
  //       { day: 'Sun', open: '', close: '', closed: true },
  //       { day: 'Mon', open: '09:00', close: '17:00', closed: false },
  //       { day: 'Tue', open: '09:00', close: '17:00', closed: false },
  //       { day: 'Wed', open: '09:00', close: '17:00', closed: false },
  //       { day: 'Thu', open: '09:00', close: '17:00', closed: false },
  //       { day: 'Fri', open: '09:00', close: '17:00', closed: false },
  //       { day: 'Sat', open: '', close: '', closed: true }
  //     ],
  //     status: 'pending',
  //     submittedDate: new Date('2025-10-08T10:30:00')
  //   },
  //   {
  //     id: '2',
  //     name: 'Tech Innovators',
  //     category: 'Technology',
  //     description: 'Leading technology consulting firm specializing in cloud solutions and digital transformation.',
  //     website: 'techinnovators.com',
  //     email: 'info@techinnovators.com',
  //     phone: '9876543210',
  //     address1: '123 Tech Street',
  //     address2: 'Suite 200',
  //     city: 'Bangalore',
  //     state: 'Karnataka',
  //     country: 'India',
  //     postalCode: '560001',
  //     latitude: '12.9716',
  //     longitude: '77.5946',
  //     hours: [
  //       { day: 'Sun', open: '', close: '', closed: true },
  //       { day: 'Mon', open: '10:00', close: '18:00', closed: false },
  //       { day: 'Tue', open: '10:00', close: '18:00', closed: false },
  //       { day: 'Wed', open: '10:00', close: '18:00', closed: false },
  //       { day: 'Thu', open: '10:00', close: '18:00', closed: false },
  //       { day: 'Fri', open: '10:00', close: '18:00', closed: false },
  //       { day: 'Sat', open: '', close: '', closed: true }
  //     ],
  //     status: 'verified',
  //     submittedDate: new Date('2025-10-07T14:20:00')
  //   },
  //   {
  //     id: '3',
  //     name: 'Creative Design Studio',
  //     category: 'Design',
  //     description: 'Full-service design agency creating stunning visual experiences for brands worldwide.',
  //     website: 'creativedesignstudio.com',
  //     email: 'hello@creativedesignstudio.com',
  //     phone: '8765432109',
  //     address1: '456 Design Lane',
  //     address2: '',
  //     city: 'Mumbai',
  //     state: 'Maharashtra',
  //     country: 'India',
  //     postalCode: '400001',
  //     latitude: '19.0760',
  //     longitude: '72.8777',
  //     hours: [
  //       { day: 'Sun', open: '', close: '', closed: true },
  //       { day: 'Mon', open: '09:30', close: '17:30', closed: false },
  //       { day: 'Tue', open: '09:30', close: '17:30', closed: false },
  //       { day: 'Wed', open: '09:30', close: '17:30', closed: false },
  //       { day: 'Thu', open: '09:30', close: '17:30', closed: false },
  //       { day: 'Fri', open: '09:30', close: '17:30', closed: false },
  //       { day: 'Sat', open: '10:00', close: '14:00', closed: false }
  //     ],
  //     status: 'pending',
  //     submittedDate: new Date('2025-10-09T09:15:00')
  //   }
  // ];

  businessData: any[] = [];

  constructor(private businessService: BusinessService, private toastService: ToastService) { }

  ngOnInit() {
    this.getAllBusinessData();
  }

  getAllBusinessData() {
    this.businessService.getAllBusinessData().subscribe((res: any) => {
      if (res.status) {
        this.businessData = res.data;
        console.log(this.businessData);

      } else {
        this.toastService.showError(res.message)
      }
    })
  }


  get filteredBusinesses(): Business[] {
    if (this.filterStatus === 5) {
      return this.businessData;
    }
    return this.businessData.filter(b => b.status === this.filterStatus);
  }


  // status => 0 = pending, 1 = active, 2 = reject, 3 = block

  get pendingCount(): number {
    return this.businessData.filter(b => b.status == 0).length;
  }

  get verifiedCount(): number {
    return this.businessData.filter(b => b.status === 1).length;
  }

  get rejectedCount(): number {
    return this.businessData.filter(b => b.status === 2).length;
  }

  get totalCount(): number {
    return this.businessData.length;
  }

  getCountByStatus(status: any): number {
    if (status === 5) {
      return this.totalCount;
    }
    return this.businessData.filter(b => b.status === status).length;
  }

  setFilter(status: any): void {
    this.filterStatus = status;
    this.selectedBusiness = null; // Clear selection when filter changes
  }

  selectBusiness(business: Business): void {
    this.selectedBusiness = business;
  }

  verifyBusiness(business: Business): void {
    business.status = 1;
    let payload = {
      id: business.id,
      isVerified: true,
      status: 1
    }
    // Move to next pending business
    this.businessService.verifyBusiness(payload).subscribe((res: any) => {
      console.log(res);
      this.getAllBusinessData();
      this.selectBusiness(business);
    })
    // this.selectNextPendingBusiness();
  }

  rejectBusiness(business: Business): void {
     // business.status = 1;
    let payload = {
      id: business.id,
      isVerified: true,
      status: 2
    }
    // Move to next pending business
    this.businessService.verifyBusiness(payload).subscribe((res: any) => {
      console.log(res);
      this.getAllBusinessData();
    })
    // this.selectNextPendingBusiness();
  }

  selectNextPendingBusiness(): void {
    const pendingBusinesses = this.businessData.filter(b => b.status === 'pending');
    if (pendingBusinesses.length > 0) {
      this.selectedBusiness = pendingBusinesses[0];
    } else {
      this.selectedBusiness = null;
    }
  }

  formatWebsiteUrl(url: string | null | undefined): string {
    if (!url) return '#';
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      return 'https://' + url;
    }
    return url;
  }


  getStatusText(status: number): string {
    switch (status) {
      case 0:
        return 'Pending';
      case 1:
        return 'Active';
      case 2:
        return 'Rejected';
      case 3:
        return 'Blocked';
      default:
        return 'Unknown';
    }
  }

    getDayOfWeek(status: number): string {
    switch (status) {
      case 0:
        return 'Sun';
      case 1:
        return 'Mon';
      case 2:
        return 'Tue';
      case 3:
        return 'Wed';
      case 4:
        return 'Thu';
      case 5:
        return 'Fri';
      case 6:
        return 'Sat';
      default:
        return '';
    }
  }

}