import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';


interface Business {
  id: number;
  name: string;
  category: string;
  rating: number;
  reviews: number;
  description: string;
  address: string;
  distance: string;
  phone: string;
  isOpen: boolean;
  image: string;
}

@Component({
  selector: 'app-bussinesslist',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './bussinesslist.component.html',
  styleUrl: './bussinesslist.component.scss'
})
export class BussinesslistComponent {
  searchTerm = 'Tiffin Service';
  location = 'Ahmedabad';
  showResults = true;
  sortBy = 'recommended';

  constructor(private router: Router) { }

  businesses: Business[] = [
    {
      id: 1,
      name: 'Spice Kitchen Tiffin Service',
      category: 'Tiffin Service',
      rating: 4.8,
      reviews: 127,
      description: 'Authentic home-style Indian meals delivered fresh daily. Specializing in North Indian cuisine with vegetarian and vegan options.',
      address: '123 Main Street, Downtown',
      distance: '0.8 mi',
      phone: '(555) 123-4567',
      isOpen: true,
      image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop'
    },
    {
      id: 2,
      name: 'Home Comfort Meals',
      category: 'Tiffin Service',
      rating: 4.6,
      reviews: 89,
      description: 'Nutritious and delicious home-cooked meals with customizable meal plans. Perfect for busy professionals and families.',
      address: '456 Oak Avenue, Midtown',
      distance: '1.2 mi',
      phone: '(555) 234-5678',
      isOpen: true,
      image: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=400&h=300&fit=crop'
    },
    {
      id: 3,
      name: 'Sunshine Tiffin Co.',
      category: 'Tiffin Service',
      rating: 4.5,
      reviews: 156,
      description: 'Daily fresh tiffin service with traditional recipes.',
      address: '789 Park Lane, Uptown',
      distance: '2.1 mi',
      phone: '(555) 345-6789',
      isOpen: false,
      image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=300&fit=crop'
    }
  ];

  get filteredBusinesses(): Business[] {
    return this.businesses;
  }

  get resultCount(): number {
    return this.showResults ? this.filteredBusinesses.length : 0;
  }

  handleSearch(): void {
    this.showResults = this.searchTerm.trim() !== '';
  }

  viewDetails(business: Business): void {
    console.log('View details for:', business.name);
    this.router.navigate(['/businessdetails']);
    // Add your navigation logic here
  }

  contact(business: Business): void {
    console.log('Contact:', business.name);
    this.router.navigate(['/businessreview']);
    // Add your contact logic here
  }
}
