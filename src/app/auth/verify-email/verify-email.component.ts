import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-verify-email',
  imports: [CommonModule],
  templateUrl: './verify-email.component.html',
  styleUrl: './verify-email.component.scss',
  providers: [AuthService]
})
export class VerifyEmailComponent {
  verificationStatus: 'pending' | 'loading' | 'success' | 'error' = 'pending';
  errorMessage: string = '';
  verificationToken: string = '';
  userEmail: string = '';
  countdown: number = 5;
  private countdownInterval: any;

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    // Get token from URL query params
    this.route.queryParams.subscribe(params => {
      this.verificationToken = params['token'] || '';
      this.userEmail = params['email'] || 'user@example.com';
    });
  }

  ngOnDestroy(): void {
    if (this.countdownInterval) {
      clearInterval(this.countdownInterval);
    }
  }

  async handleVerifyEmail(): Promise<void> {
    this.verificationStatus = 'loading';

    try {
      // Replace with your actual API call
      await this.authService.verifyEmail(this.verificationToken).subscribe((res: any) => {
        console.log(res);
        if(res.status) {
          this.verificationStatus = 'success'; 
          this.startCountdown();
        } else {
          this.errorMessage = res.message
          this.verificationStatus = 'error'; 
          throw new Error('Verification failed');
        }
        console.log(this.verificationStatus);
        
      })


    } catch (error: any) {
      this.verificationStatus = 'error';
      this.errorMessage = error.message || 'Verification failed. Please try again or contact support.';
    }
  }

  async handleResendEmail(): Promise<void> {
    this.verificationStatus = 'loading';

    try {
      // Replace with your actual API call
      // await this.authService.resendVerificationEmail(this.userEmail);

      // Simulate API call
      await this.delay(1500);

      this.verificationStatus = 'pending';

      // Show success notification
      alert('Verification email sent! Please check your inbox.');

    } catch (error: any) {
      this.verificationStatus = 'error';
      this.errorMessage = 'Failed to resend email. Please try again later.';
    }
  }

  startCountdown(): void {
    this.countdown = 5;
    this.countdownInterval = setInterval(() => {
      this.countdown--;
      if (this.countdown === 0) {
        clearInterval(this.countdownInterval);
        this.goToLoginPage();
      }
    }, 1000);
  }

  goToLoginPage(): void {
    if (this.countdownInterval) {
      clearInterval(this.countdownInterval);
    }
    this.router.navigate(['/login']);
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}