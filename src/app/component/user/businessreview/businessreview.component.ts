import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface ReviewForm {
  rating: number;
  name: string;
  email: string;
  title: string;
  review: string;
}

@Component({
  selector: 'app-businessreview',
  imports: [CommonModule, FormsModule],
  templateUrl: './businessreview.component.html',
  styleUrl: './businessreview.component.scss'
})
export class BusinessreviewComponent {
 form: ReviewForm = {
    rating: 0,
    name: '',
    email: '',
    title: '',
    review: ''
  };

  hoverRating = 0;
  submitted = false;

  setRating(rating: number): void {
    this.form.rating = rating;
  }

  submitReview(): void {
    if (this.form.rating === 0) {
      alert('Please select a rating');
      return;
    }

    console.log('Review submitted:', this.form);
    this.submitted = true;

    // Reset form after submission
    setTimeout(() => {
      this.form = {
        rating: 0,
        name: '',
        email: '',
        title: '',
        review: ''
      };
    }, 2000);
  }
}
