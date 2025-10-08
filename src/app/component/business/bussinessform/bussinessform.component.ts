import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BusinessService } from '../../../service/business.service';
import { AuthService } from '../../../service/auth.service';

interface DayHours {
  open: string;
  close: string;
  closed: boolean;
}

interface Step {
  number: number;
  title: string;
  status: string;
}

@Component({
  selector: 'app-bussinessform',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './bussinessform.component.html',
  styleUrls: ['./bussinessform.component.scss']
})
export class BussinessformComponent {
  currentStep = 1;
  form: FormGroup;

  // Flags to track API data
  hasApiHours = false;
  hasApiLocation = false;

  constructor(private fb: FormBuilder, private businessService: BusinessService, private authService: AuthService) {
    this.form = this.fb.group({
      id: [0],
      // Step 1
      businessName: [authService.currentUser().businessName, Validators.required],
      category: [authService.currentUser().businessCategory, Validators.required],
      description: [''],
      website: [''],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],

      // Step 2
      locationId: [0],
      address1: ['', Validators.required],
      address2: [''],
      city: ['', Validators.required],
      state: ['', Validators.required],
      country: ['', Validators.required],
      postalCode: ['', Validators.required],
      latitude: [''],
      longitude: [''],

      // Step 3
      hours: this.fb.group({
        sun: this.fb.group({ open: ['09:00'], close: ['17:00'], closed: [true] }),
        mon: this.fb.group({ open: ['09:00'], close: ['17:00'], closed: [false] }),
        tue: this.fb.group({ open: ['09:00'], close: ['17:00'], closed: [false] }),
        wed: this.fb.group({ open: ['09:00'], close: ['17:00'], closed: [false] }),
        thu: this.fb.group({ open: ['09:00'], close: ['17:00'], closed: [false] }),
        fri: this.fb.group({ open: ['09:00'], close: ['17:00'], closed: [false] }),
        sat: this.fb.group({ open: ['09:00'], close: ['17:00'], closed: [false] }),
      })
    });
  }

  ngOnInit() {
    this.patchValue();
  }

  /** Step management */
  get steps(): Step[] {
    return [
      {
        number: 1,
        title: 'Business Details',
        status: this.isStepCompleted(1) ? 'completed' : (this.currentStep === 1 ? 'in-progress' : 'pending')
      },
      {
        number: 2,
        title: 'Location',
        status: this.isStepCompleted(2) ? 'completed' : (this.currentStep === 2 ? 'in-progress' : 'pending')
      },
      {
        number: 3,
        title: 'Hours',
        status: this.isStepCompleted(3) ? 'completed' : (this.currentStep === 3 ? 'in-progress' : 'pending')
      },
      {
        number: 4,
        title: 'Review & Submit',
        status: this.currentStep === 4 ? 'in-progress' : 'pending'
      }
    ];
  }

  isStepCompleted(step: number): boolean {
    switch (step) {
      case 1:
        const { businessName, category, email } = this.form.value;
        return !!(businessName && category && email);
      case 2:
        return this.hasApiLocation || !!this.form.value.address1;
      case 3:
        return this.hasApiHours && this.getOpenDaysCount() > 0;
      default:
        return false;
    }
  }

  /** Hours helpers */
  get hoursGroup(): FormGroup {
    return this.form.get('hours') as FormGroup;
  }

  get hoursArray() {
    return Object.entries(this.hoursGroup.controls);
  }

  toggleDayClosed(day: string): void {
    const dayGroup = this.hoursGroup.get(day) as FormGroup;
    const current = dayGroup.get('closed')?.value;
    dayGroup.patchValue({ closed: !current });
  }

  getOpenDaysCount(): number {
    const hours = this.hoursGroup.value as { [key: string]: DayHours };
    return Object.values(hours).filter(day => !day.closed).length;
  }

  /** Navigation */
  nextStep(): void {
    if (!this.isStepCompleted(this.currentStep)) {
      alert('Please complete the current step before proceeding.');
      return;
    }
    if (this.currentStep < 4) this.currentStep++;
  }

  prevStep(): void {
    if (this.currentStep > 1) this.currentStep--;
  }

  /** Form submission */
  saveAndContinue(): void {
    if (this.currentStep < 4 && this.isStepCompleted(this.currentStep)) {
      if (this.currentStep === 1) {
        const payload = {
          id: this.form.value.id,
          ownerUserId: this.authService.currentUser().UserId,
          name: this.form.value.businessName,
          description: this.form.value.description,
          website: this.form.value.website,
          category: this.form.value.category,
          phone: this.form.value.phone,
          email: this.form.value.email,
        };
        if (payload.id === 0) {
          this.businessService.registerBusiness(payload).subscribe(res => console.log(res));
        } else {
          this.businessService.updateBusiness(payload).subscribe(res => console.log(res));
        }
      } else if (this.currentStep == 2) {
        const payload = {
          id: this.form.value.locationId,
          businessId: this.form.value.id,
          addressLine1: this.form.value.address1,
          addressLine2: this.form.value.address2,
          city: this.form.value.city,
          state: this.form.value.state,
          country: this.form.value.country,
          postalCode: this.form.value.postalCode,
          latitude: this.form.value.latitude,
          longitude: this.form.value.longitude
        }
        this.businessService.addUpdateBusinessLocation(payload).subscribe(res => console.log(res));
      }
    }
  }

  onSubmit(): void {
    if (this.form.valid) {
      console.log('Form Submitted ✅', this.form.value);
      alert('Business registered successfully!');
    } else {
      alert('Please fill all required fields before submitting.');
    }
  }

  /** Patch API response */
  patchValue() {
    this.businessService.getBusinessData().subscribe((res: any) => {
      if (!res || res.length === 0) return;

      const data = res[0];

      // Step 1
      this.form.patchValue({
        id: data.id,
        businessName: data.name,
        category: data.category,
        description: data.description,
        website: data.website,
        email: data.email,
        phone: data.phone
      });

      // Step 2 (location)
      if (data.location) {
        this.hasApiLocation = true;
        this.form.patchValue({
          address1: data.location.address1 || '',
          address2: data.location.address2 || '',
          city: data.location.city || '',
          state: data.location.state || '',
          country: data.location.country || '',
          postalCode: data.location.postalCode || '',
          latitude: data.location.latitude || '',
          longitude: data.location.longitude || '',
        });
      }

      // Step 3 (hours)
      if (data.hours && data.hours.length > 0) {
        this.hasApiHours = true;
        const hoursGroup = this.hoursGroup;
        data.hours.forEach((item: any) => {
          if (hoursGroup.get(item.day)) {
            hoursGroup.get(item.day)?.patchValue({
              open: item.open,
              close: item.close,
              closed: item.closed
            });
          }
        });
      } else {
        this.hasApiHours = false; // no API hours, keep defaults
      }

      console.log(this.form.value);
    });
  }
}
