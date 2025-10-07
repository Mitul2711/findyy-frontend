import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface DayHours {
  open: string;
  close: string;
  closed: boolean;
}

interface FormData {
  businessName: string;
  category: string;
  description: string;
  website: string;
  email: string;
  phone: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
  latitude: string;
  longitude: string;
  hours: {
    [key: string]: DayHours;
  };
}

interface Step {
  number: number;
  title: string;
  status: string;
}

@Component({
  selector: 'app-bussinessform',
  imports: [CommonModule, FormsModule],
  templateUrl: './bussinessform.component.html',
  styleUrl: './bussinessform.component.scss'
})
export class BussinessformComponent {
currentStep: number = 1;
  
  formData: FormData = {
    businessName: '',
    category: '',
    description: '',
    website: '',
    email: '',
    phone: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    country: '',
    postalCode: '',
    latitude: '',
    longitude: '',
    hours: {
      sun: { open: '09:00', close: '17:00', closed: true },
      mon: { open: '09:00', close: '17:00', closed: false },
      tue: { open: '09:00', close: '17:00', closed: false },
      wed: { open: '09:00', close: '17:00', closed: false },
      thu: { open: '09:00', close: '17:00', closed: false },
      fri: { open: '09:00', close: '17:00', closed: false },
      sat: { open: '09:00', close: '17:00', closed: false }
    }
  };

  get steps(): Step[] {
    return [
      { number: 1, title: 'Business Details', status: this.currentStep > 1 ? 'completed' : this.currentStep === 1 ? 'in-progress' : 'pending' },
      { number: 2, title: 'Location', status: this.currentStep > 2 ? 'completed' : this.currentStep === 2 ? 'in-progress' : 'pending' },
      { number: 3, title: 'Hours', status: this.currentStep > 3 ? 'completed' : this.currentStep === 3 ? 'in-progress' : 'pending' },
      { number: 4, title: 'Review & Submit', status: this.currentStep === 4 ? 'in-progress' : 'pending' }
    ];
  }

  get hoursArray() {
    return Object.entries(this.formData.hours);
  }

  nextStep(): void {
    if (this.currentStep < 4) {
      this.currentStep++;
    }
  }

  prevStep(): void {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  getOpenDaysCount(): number {
    return Object.values(this.formData.hours).filter(day => !day.closed).length;
  }

  toggleDayClosed(day: string): void {
    this.formData.hours[day].closed = !this.formData.hours[day].closed;
  }

  onSubmit(): void {
    alert('Form submitted!');
    console.log('Form Data:', this.formData);
  }
}
