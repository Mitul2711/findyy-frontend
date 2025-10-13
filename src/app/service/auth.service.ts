import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FixedRoutes, Modules } from '../app.url';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  registerUser(data: any) {
    return this.http.post(`${Modules.Base}${FixedRoutes.Auth.Url}/register`, data);
  }

  verifyEmail(token: any) {
    return this.http.get(`${Modules.Base}${FixedRoutes.Auth.Url}/verify-email?token=${token}`);
  }

  loginUser(data: any) {
    return this.http.post(`${Modules.Base}${FixedRoutes.Auth.Url}/login`, data);
  }
  
  isUserLoggedIn(): boolean {
    const token = localStorage.getItem('token');
    return !!token;
  }
  
  currentUser(): any | null {
    try {
      const token = localStorage.getItem("token");
      if (!token) return null;
      
      const payload = token.split('.')[1];
    if (!payload) return null;
    
    const base64 = payload.replace(/-/g, '+').replace(/_/g, '/');
    const decoded = atob(base64);
    return JSON.parse(decoded);
  } catch (error) {
    console.error('Invalid JWT token', error);
    return null;
  }
}

adminNotification(data: any) {
  return this.http.post(`${Modules.Base}${FixedRoutes.AdminNotification}`, data);
}

businessNotification(data: any) {
  return this.http.post(`${Modules.Base}${FixedRoutes.BusinessNotification}`, data);
}


}
