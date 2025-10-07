import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { HomeComponent } from './component/home/home.component';
import { BussinessformComponent } from './component/bussinessform/bussinessform.component';
import { BussinesslistComponent } from './component/bussinesslist/bussinesslist.component';
import { BusinessreviewComponent } from './component/businessreview/businessreview.component';
import { BusinesscategoriesComponent } from './component/businesscategories/businesscategories.component';
import { HowitworksComponent } from './component/howitworks/howitworks.component';

export const routes: Routes = [
    {path: "", component: HomeComponent},
    {path: "login", component: LoginComponent},
    {path: "signup", component: SignupComponent},
    {path: "businessregister", component: BussinessformComponent},
    {path: "businesslist", component: BussinesslistComponent},
    {path: "businessreview", component: BusinessreviewComponent},
    {path: "businesscategory", component: BusinesscategoriesComponent},
    {path: "howitworks", component: HowitworksComponent}
];
