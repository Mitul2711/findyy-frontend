import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { ToastService } from '../../service/toast.service';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [AuthService]
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private toastService: ToastService, private router: Router) {}

  onSubmit() {
    const payload = { email: this.email, password: this.password };
    this.authService.loginUser(payload).subscribe((res: any) => {
      if (res.status) {
        localStorage.setItem("token", res.data);
        this.toastService.showSuccess(res.message);
        this.router.navigate(['/'])
      } else {
        this.toastService.showError(res.message);
      }
    });
  }
}
