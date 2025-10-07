import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

interface Step {
  id: number;
  title: string;
  description: string;
  icon: string;
  color: string;
}

interface Feature {
  title: string;
  description: string;
  icon: string;
}


@Component({
  selector: 'app-howitworks',
  imports: [CommonModule, RouterModule],
  templateUrl: './howitworks.component.html',
  styleUrl: './howitworks.component.scss'
})
export class HowitworksComponent {
    constructor(private sanitizer: DomSanitizer) { }

userSteps: Step[] = [
    {
      id: 1,
      title: 'Search & Discover',
      description: 'Search for services by category, location, or keywords. Filter by distance, ratings, and availability.',
      icon: 'search',
      color: 'bg-teal-600'
    },
    {
      id: 2,
      title: 'Compare & Review',
      description: 'View detailed business profiles, read reviews from other customers, and check ratings to make informed decisions.',
      icon: 'star',
      color: 'bg-teal-600'
    },
    {
      id: 3,
      title: 'Connect & Engage',
      description: 'Contact businesses directly, save your favorites, and leave reviews to help others in the community.',
      icon: 'phone',
      color: 'bg-teal-600'
    }
  ];

  businessSteps: Step[] = [
    {
      id: 1,
      title: 'Create Account',
      description: 'Sign up for free and create your business owner account in minutes.',
      icon: 'user',
      color: 'bg-orange-500'
    },
    {
      id: 2,
      title: 'Add Business',
      description: 'Fill in your business details, location, hours, and upload photos.',
      icon: 'building',
      color: 'bg-orange-500'
    },
    {
      id: 3,
      title: 'Get Verified',
      description: 'Submit for verification to gain customer trust and visibility.',
      icon: 'check',
      color: 'bg-orange-500'
    },
    {
      id: 4,
      title: 'Manage & Grow',
      description: 'Receive leads, respond to reviews, and grow your customer base.',
      icon: 'chart',
      color: 'bg-orange-500'
    }
  ];

  features: Feature[] = [
    {
      title: 'Free Registration',
      description: 'Create your business profile at no cost. No hidden fees or charges.',
      icon: 'dollar'
    },
    {
      title: 'Location-Based Search',
      description: 'Find businesses near you with our advanced distance-based search.',
      icon: 'map'
    },
    {
      title: 'Verified Businesses',
      description: 'Trust verified businesses with our admin approval system.',
      icon: 'shield'
    },
    {
      title: 'Customer Reviews',
      description: 'Read honest reviews and ratings from real customers.',
      icon: 'message'
    },
    {
      title: 'Easy Contact',
      description: 'Connect with businesses via phone, email, or direct messages.',
      icon: 'mail'
    },
    {
      title: 'Favorites List',
      description: 'Save and organize your favorite businesses for quick access.',
      icon: 'heart'
    }
  ];

  faqs = [
    {
      question: 'Is it really free for businesses?',
      answer: 'Yes! Local Biz Finder is completely free for business owners. Create your profile, upload photos, and start receiving customer inquiries at no cost.'
    },
    {
      question: 'How do I search for businesses near me?',
      answer: 'Simply enter your location or allow location access, then search by category or keywords. Our system will show you the nearest businesses sorted by distance.'
    },
    {
      question: 'Can I leave reviews?',
      answer: 'Absolutely! After creating a free user account, you can leave reviews and ratings for any business you\'ve interacted with.'
    },
    {
      question: 'How does business verification work?',
      answer: 'Business owners submit their information, and our admin team verifies the details. Verified businesses get a special badge to build trust with customers.'
    }
  ];

  getIcon(iconName: string): SafeHtml {
    const icons: { [key: string]: string } = {
      search: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>',
      star: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/></svg>',
      phone: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>',
      user: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>',
      building: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/></svg>',
      check: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>',
      chart: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"/></svg>',
      dollar: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>',
      map: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"/></svg>',
      shield: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>',
      message: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/></svg>',
      mail: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>',
      heart: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/></svg>'
    };
    const svg = icons[iconName] || icons['search'];
    return this.sanitizer.bypassSecurityTrustHtml(svg);
  }

  getColorCode(bgClass: string): string {
    const colors: { [key: string]: string } = {
      'bg-teal-600': '#0d9488',
      'bg-orange-500': '#f97316'
    };
    return colors[bgClass] || '#0d9488';
  }
}
