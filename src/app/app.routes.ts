import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';

export const routes: Routes = [
    {path: "", component: LoginComponent},
    {path: "signup", component: SignupComponent},
];
