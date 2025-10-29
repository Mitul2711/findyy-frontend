import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-header',
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  providers: [AuthService]
})
export class HeaderComponent {

  unreadCount = 3;
  mobileMenuOpen = false;
  isUser: boolean = false;

 constructor(public authService: AuthService, private router: Router) {
  this.isUser = authService.isUserLoggedIn() ? authService.currentUser().role == "customer" : true;
 }

  userMenuOpen = false;
  userName = '';
  userEmail = '';


  ngOnInit(): void {
  }

  getUserInitials(): string {
    if (!this.authService.currentUser().first_name) return 'U';
    
    const names = this.authService.currentUser().first_name.trim().split(' ');
    if (names.length >= 2) {
      return (names[0][0] + names[1][0]).toUpperCase();
    }
    return this.authService.currentUser().first_name.substring(0, 2).toUpperCase();
  }

  toggleMobileMenu(): void {
    this.mobileMenuOpen = !this.mobileMenuOpen;
    if (this.mobileMenuOpen) {
      this.userMenuOpen = false;
    }
  }

  closeMobileMenu(): void {
    this.mobileMenuOpen = false;
  }

  toggleUserMenu(): void {
    this.userMenuOpen = !this.userMenuOpen;
  }

  closeUserMenu(): void {
    this.userMenuOpen = false;
  }

  logout(): void {
    // Clear auth data
    localStorage.removeItem('token');
    
    // Update state
    this.userName = '';
    this.userEmail = '';
    
    // Close menus
    this.userMenuOpen = false;
    this.mobileMenuOpen = false;
    
    // Redirect to home or login
    this.router.navigate(['/login']);
  }

}
