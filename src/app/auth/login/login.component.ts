import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
email: string = '';
  password: string = '';

  onSubmit() {
    console.log('Login attempt:', { email: this.email, password: this.password });
    // Add your authentication logic here
  }
}
