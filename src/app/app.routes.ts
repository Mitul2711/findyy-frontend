import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { HomeComponent } from './component/home/home.component';
import { BussinessformComponent } from './component/business/bussinessform/bussinessform.component';
import { BussinesslistComponent } from './component/user/bussinesslist/bussinesslist.component';
import { BusinessreviewComponent } from './component/user/businessreview/businessreview.component';
import { BusinesscategoriesComponent } from './component/user/businesscategories/businesscategories.component';
import { HowitworksComponent } from './component/howitworks/howitworks.component';
import { BusinessDetailComponent } from './component/user/business-details/business-details.component';
import { BusinessInfoComponent } from './component/business/business-info/business-info.component';
import { VerifyEmailComponent } from './auth/verify-email/verify-email.component';
import { AdmindashComponent } from './component/admindash/admindash.component';

export const routes: Routes = [
    {path: "", component: HomeComponent},
    {path: "login", component: LoginComponent},
    {path: "signup", component: SignupComponent},
    {path: "businessregister", component: BussinessformComponent},
    {path: "businesslist", component: BussinesslistComponent},
    {path: "businessreview", component: BusinessreviewComponent},
    {path: "businesscategory", component: BusinesscategoriesComponent},
    {path: "howitworks", component: HowitworksComponent},
    {path: "businessdetails", component: BusinessDetailComponent},
    {path: "businessinfo", component: BusinessInfoComponent},
    {path: "verifyemail", component: VerifyEmailComponent},
    {path: "admin", component: AdmindashComponent},
    {path: '**', component: HomeComponent},
];
