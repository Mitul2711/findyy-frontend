import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { BusinessService } from '../../../service/business.service';


interface Category {
  id: number;
  name: string;
  description: string;
  businessCount: number;
  icon: string;
}

@Component({
  selector: 'app-businesscategories',
  imports: [CommonModule, FormsModule],
  templateUrl: './businesscategories.component.html',
  styleUrl: './businesscategories.component.scss'
})
export class BusinesscategoriesComponent {
  searchQuery = '';

  constructor(private sanitizer: DomSanitizer, private businessService: BusinessService) { }

  categories: Category[] = [
    {
      id: 1,
      name: 'Tiffin Service',
      description: 'Home-cooked meals delivered fresh',
      businessCount: 127,
      icon: 'utensils'
    },
    {
      id: 2,
      name: 'Plumbing',
      description: 'Professional plumbing services',
      businessCount: 84,
      icon: 'wrench'
    },
    {
      id: 3,
      name: 'House Cleaning',
      description: 'Reliable cleaning professionals',
      businessCount: 156,
      icon: 'sparkles'
    },
    {
      id: 4,
      name: 'Handyman',
      description: 'Fix, repair, and maintain',
      businessCount: 93,
      icon: 'hammer'
    },
    {
      id: 5,
      name: 'Auto Repair',
      description: 'Car maintenance and repair',
      businessCount: 71,
      icon: 'car'
    },
    {
      id: 6,
      name: 'Home Renovation',
      description: 'Transform your living space',
      businessCount: 62,
      icon: 'home'
    },
    {
      id: 7,
      name: 'Hair & Beauty',
      description: 'Salons and beauty services',
      businessCount: 189,
      icon: 'scissors'
    },
    {
      id: 8,
      name: 'Health & Wellness',
      description: 'Fitness and wellness centers',
      businessCount: 134,
      icon: 'heart'
    },
    {
      id: 9,
      name: 'Education & Tutoring',
      description: 'Learn new skills',
      businessCount: 98,
      icon: 'education'
    },
    {
      id: 10,
      name: 'Photography',
      description: 'Capture special moments',
      businessCount: 76,
      icon: 'camera'
    },
    {
      id: 11,
      name: 'Event Planning',
      description: 'Make events memorable',
      businessCount: 54,
      icon: 'gift'
    },
    {
      id: 12,
      name: 'Pet Services',
      description: 'Care for your furry friends',
      businessCount: 67,
      icon: 'paw'
    },
    {
      id: 13,
      name: 'IT Services',
      description: 'Tech support and solutions',
      businessCount: 112,
      icon: 'laptop'
    },
    {
      id: 14,
      name: 'Laundry & Dry Cleaning',
      description: 'Professional garment care',
      businessCount: 43,
      icon: 'shirt'
    },
    {
      id: 15,
      name: 'Catering',
      description: 'Food for every occasion',
      businessCount: 89,
      icon: 'coffee'
    }
  ];

  ngOnInit() {
    this.getCategories();
  }

  get filteredCategories(): Category[] {
    if (!this.searchQuery.trim()) {
      return this.categories;
    }
    return this.categories.filter(cat =>
      cat.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      cat.description.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  getCategories() {
    this.businessService.getBusinessCategory().subscribe((res: any) => {
      this.categories = res.data;
      console.log(this.categories);
      
    })
  }

  searchCategories(): void {
    // Search functionality is handled by filteredCategories getter
  }

  getCategoryIcon(iconName: string): SafeHtml  {
    const icons: { [key: string]: string } = {
      utensils: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/></svg>',
      wrench: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/></svg>',
      sparkles: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"/></svg>',
      hammer: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.121 14.121L19 19m-7-7l7-7m-7 7l-2.879 2.879M12 12L9.121 9.121m0 5.758a3 3 0 10-4.243 4.243 3 3 0 004.243-4.243zm0-5.758a3 3 0 10-4.243-4.243 3 3 0 004.243 4.243z"/></svg>',
      car: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"/></svg>',
      home: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/></svg>',
      scissors: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.121 14.121L19 19m-7-7l7-7m-7 7l-2.879 2.879M12 12L9.121 9.121m0 5.758a3 3 0 10-4.243 4.243 3 3 0 004.243-4.243zm0-5.758a3 3 0 10-4.243-4.243 3 3 0 004.243 4.243z"/></svg>',
      heart: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/></svg>',
      education: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l9-5-9-5-9 5 9 5z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"/></svg>',
      camera: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"/></svg>',
      gift: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"/></svg>',
      paw: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"/></svg>',
      laptop: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>',
      shirt: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"/></svg>',
      coffee: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h18M4 7h16l-1.5 12a2 2 0 01-2 1.5h-9a2 2 0 01-2-1.5L4 7z"/></svg>'
    };
    const svg = icons[iconName] || icons['wrench'];
    return this.sanitizer.bypassSecurityTrustHtml(svg);
  }
}