import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../service/auth.service';
import { BusinessService } from '../../../service/business.service';

@Component({
  selector: 'app-business-home',
  imports: [CommonModule, RouterModule],
  templateUrl: './business-home.component.html',
  styleUrl: './business-home.component.scss'
})
export class BusinessHomeComponent {

  openFaq: number | null = null;

  steps = [
    {
      num: '1',
      title: 'Create Account',
      desc: 'Sign up for free and create your business owner account in minutes.',
      iconPath: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z'
    },
    {
      num: '2',
      title: 'Add Business',
      desc: 'Fill in your business details, location, hours, and upload photos.',
      iconPath: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'
    },
    {
      num: '3',
      title: 'Get Verified',
      desc: 'Submit for verification to gain customer trust and visibility.',
      iconPath: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
    },
    {
      num: '4',
      title: 'Manage & Grow',
      desc: 'Receive leads, respond to reviews, and grow your customer base.',
      iconPath: 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6'
    }
  ];

  features = [
    'Free business listing',
    'Customer review management',
    'Direct customer inquiries',
    'Photo gallery showcase',
    'Business hours display',
    'Location mapping'
  ];

  benefits = [
    {
      title: 'Free Registration',
      badge: '100% Free',
      desc: 'Create your business profile at no cost. No hidden fees or charges.',
      iconPath: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
    },
    {
      title: 'Location-Based Search',
      badge: '10K+ Searches',
      desc: 'Get discovered by customers searching in your area.',
      iconPath: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z'
    },
    {
      title: 'Verified Badge',
      badge: '95% Trust Rate',
      desc: 'Build trust with our verification system and stand out.',
      iconPath: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z'
    }
  ];

  faqs = [
    'Is it really free for businesses?',
    'How do I search for businesses near me?',
    'Can I leave reviews?',
    'How does business verification work?'
  ];

  toggleFaq(index: number): void {
    this.openFaq = this.openFaq === index ? null : index;
  }

  dashboardData: any = {
    isVerified: false
  };

  constructor(private authService: AuthService, private businessService: BusinessService) {}

  ngOnInit() {
    this.getDashData();
  }

  getDashData() {
    this.businessService.getBusinessDashData(this.authService.currentUser().BusinessId).subscribe((res: any) => {
      this.dashboardData = res.data;
    })
  }

   getProgressBarColor(): string {
    const pct = this.dashboardData.completionPercentage;

    if (pct === 0) return 'bg-gray-400';
    if (pct === 25) return 'bg-orange-500';
    if (pct === 50) return 'bg-yellow-500';
    if (pct === 75) return 'bg-teal-600';
    if (pct === 100) return 'bg-green-500';

    // Optional: default color
    return 'bg-gray-400';
  }

}