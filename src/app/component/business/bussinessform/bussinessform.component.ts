import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BusinessService } from '../../../service/business.service';
import { AuthService } from '../../../service/auth.service';
import { ToastService } from '../../../service/toast.service';

interface DayHours {
  openTime: string;
  closeTime: string;
  isClosed: boolean;
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
businessInfo: any;
  // Flags to track API data
  hasApiHours = false;
  hasApiLocation = false;

  constructor(private fb: FormBuilder, private businessService: BusinessService, private authService: AuthService, private toastService: ToastService) {
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
        sun: this.fb.group({ openTime: ['09:00'], closeTime: ['17:00'], isClosed: [true], id: 0, dayOfWeek: 0 }),
        mon: this.fb.group({ openTime: ['09:00'], closeTime: ['17:00'], isClosed: [false], id: 0, dayOfWeek: 1 }),
        tue: this.fb.group({ openTime: ['09:00'], closeTime: ['17:00'], isClosed: [false], id: 0, dayOfWeek: 2 }),
        wed: this.fb.group({ openTime: ['09:00'], closeTime: ['17:00'], isClosed: [false], id: 0, dayOfWeek: 3 }),
        thu: this.fb.group({ openTime: ['09:00'], closeTime: ['17:00'], isClosed: [false], id: 0, dayOfWeek: 4 }),
        fri: this.fb.group({ openTime: ['09:00'], closeTime: ['17:00'], isClosed: [false], id: 0, dayOfWeek: 5 }),
        sat: this.fb.group({ openTime: ['09:00'], closeTime: ['17:00'], isClosed: [false], id: 0, dayOfWeek: 6 }),
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
        status: this.businessInfo == null ? 'pending' : this.isStepCompleted(1) ? 'completed' : (this.currentStep === 1 ? 'in-progress' : 'pending')
      },
      {
        number: 2,
        title: 'Location',
        status: this.businessInfo == null ? 'pending' : this.isStepCompleted(2) ? 'completed' : (this.currentStep === 2 ? 'in-progress' : 'pending')
      },
      {
        number: 3,
        title: 'Hours',
        status: this.businessInfo == null ? 'pending' : this.isStepCompleted(3) ? 'completed' : (this.currentStep === 3 ? 'in-progress' : 'pending')
      },
      {
        number: 4,
        title: 'Review & Submit',
        status: this.businessInfo == null ? 'pending' : this.isStepCompleted(4) ? 'completed' : (this.currentStep === 4 ? 'in-progress' : 'pending')
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
        case 4:
        return this.businessInfo.isVerified;
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
    const current = dayGroup.get('isClosed')?.value;
    dayGroup.patchValue({ isClosed: !current });
  }

  getOpenDaysCount(): number {
    const hours = this.hoursGroup.value as { [key: string]: DayHours };
    return Object.values(hours).filter(day => !day.isClosed).length;
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
    if (this.currentStep < 4) {
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
          this.businessService.registerBusiness(payload).subscribe((res: any) => {
            if (res.status) {
              this.toastService.showSuccess(res.message);
            } else {
              this.toastService.showError(res.message);
            }
            setTimeout(() => {
              this.currentStep++;
            }, 1000);
          });
        } else {
          this.businessService.updateBusiness(payload).subscribe((res: any) => {
            if (res.status) {
              this.toastService.showSuccess(res.message);
            } else {
              this.toastService.showError(res.message);
            }
            setTimeout(() => {
              this.currentStep++;
            }, 1000);
          });
        }
      } else if (this.currentStep === 2) {
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
        this.businessService.addUpdateBusinessLocation(payload).subscribe((res: any) => {
          if (res.status) {
            this.toastService.showSuccess(res.message);
          } else {
            this.toastService.showError(res.message);
          }
          setTimeout(() => {
            this.currentStep++;
          }, 1000);
        });
      } else if (this.currentStep === 3) {
        const payload = Object.values(this.form.value.hours).map((day: any) => ({
          id: day.id,
          businessId: this.form.value.id,
          dayOfWeek: day.dayOfWeek,
          openTime: `${day.openTime}:00`,
          closeTime: `${day.closeTime}:00`,
          isClosed: day.isClosed
        }));

        this.businessService.addUpdateBusinessHours(payload).subscribe((res: any) => {
          if (res.status) {
            this.toastService.showSuccess(res.message);
          } else {
            this.toastService.showError(res.message);
          }
          setTimeout(() => {
            this.checkStepNavigation();
          }, 1000);
        });
      }
    }
  }

  onSubmit(): void {
    if (this.form.valid) {
      alert('Business registered successfully!');
    } else {
      alert('Please fill all required fields before submitting.');
    }
  }

  /** Patch API response */
  patchValue() {
    this.businessService.getBusinessDataById(this.authService.currentUser().UserId).subscribe((res: any) => {
      if (!res.status) return;

      const data = res.data;

      this.businessInfo = res.data
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

      this.businessService.getBusinessLocationById(data.id).subscribe((locationRes: any) => {
        if (locationRes) {
          this.hasApiLocation = true;
          this.form.patchValue({
            locationId: locationRes.data.id,
            address1: locationRes.data.addressLine1 || '',
            address2: locationRes.data.addressLine2 || '',
            city: locationRes.data.city || '',
            state: locationRes.data.state || '',
            country: locationRes.data.country || '',
            postalCode: locationRes.data.postalCode || '',
            latitude: locationRes.data.latitude || '',
            longitude: locationRes.data.longitude || '',
          });
        } else {
          this.hasApiLocation = false;
        }

        this.checkStepNavigation();
      });

      const dayMap = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
      this.businessService.getBusinessHoursById(data.id).subscribe((hoursRes: any) => {
        if (hoursRes.data && hoursRes.data.length > 0) {
          this.hasApiHours = true;
          const hoursGroup = this.form.get('hours') as FormGroup;

          hoursRes.data.forEach((item: any) => {
            const dayName = dayMap[item.dayOfWeek];
            const dayControl = hoursGroup.get(dayName) as FormGroup;
            if (dayControl) {
              dayControl.patchValue({
                id: item.id,
                openTime: item.openTime?.substring(0, 5),
                closeTime: item.closeTime?.substring(0, 5),
                isClosed: item.isClosed,
                dayOfWeek: item.dayOfWeek
              });
            }
          });
        } else {
          this.hasApiHours = false;
        }

        this.checkStepNavigation(); // <-- Navigate after Step 3 patch
      });
    });
  }

  /** Automatically navigate to the next incomplete step */
  checkStepNavigation() {
    if (this.isStepCompleted(1) && this.isStepCompleted(2) && this.isStepCompleted(3) && !this.isStepCompleted(4)) {
      this.currentStep = 4; // go directly to Step 4
    }
    else if (this.isStepCompleted(1) && this.isStepCompleted(2) && !this.isStepCompleted(3)) {
      this.currentStep = 3; // go directly to Step 3
    } else if (this.isStepCompleted(1) && !this.isStepCompleted(2)) {
      this.currentStep = 2; // go to Step 2
    } else {
      this.currentStep = 1; // default to Step 1
    }
  }
}
