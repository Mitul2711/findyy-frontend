import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FixedRoutes, Modules } from '../app.url';

@Injectable({
  providedIn: 'root'
})
export class BusinessService {

  constructor(private http: HttpClient) { }

  registerBusiness(data: any) {
    return this.http.post(`${Modules.Base}${FixedRoutes.BusinessRegister.Business}`, data);
  }

  addUpdateBusinessLocation(data: any) {
    return this.http.post(`${Modules.Base}${FixedRoutes.BusinessRegister.BusinessLocation}`, data);
  }

  addUpdateBusinessHours(data: any) {
    return this.http.post(`${Modules.Base}${FixedRoutes.BusinessRegister.BusinessHours}`, data);
  }

  getBusinessDataById(ownerUserId: any) {
    return this.http.get(`${Modules.Base}${FixedRoutes.BusinessRegister.Business}/${ownerUserId}`);
  }

  getAllBusinessData() {
    return this.http.get(`${Modules.Base}${FixedRoutes.BusinessRegister.Business}`);
  }

  updateBusiness(data: any) {
    return this.http.post(`${Modules.Base}${FixedRoutes.BusinessRegister.Business}/${data.id}`, data);
  }

  getBusinessLocationById(businessId: any) {
    return this.http.get(`${Modules.Base}${FixedRoutes.BusinessRegister.BusinessLocation}/${businessId}`);
  }

  getBusinessHoursById(businessId: any) {
    return this.http.get(`${Modules.Base}${FixedRoutes.BusinessRegister.BusinessHours}/${businessId}`);
  }

  getBusinessDashData(businessId: any) {
    return this.http.get(`${Modules.Base}${FixedRoutes.BusinessDash}/${businessId}`);
  }

  verifyBusiness(data: any) {
    return this.http.post(`${Modules.Base}${FixedRoutes.BusinessRegister.BusinessVerify}/${data.id}`, data);
  }

  getBusinessCategory() {
    return this.http.get(`${Modules.Base}${FixedRoutes.BusinessCategory}`);
  }

  searchBusiness(data: any) {
    return this.http.post(`${Modules.Base}${FixedRoutes.SearchBusiness}`, data);
  }

  addBusinessReview(data: any) {
    return this.http.post(`${Modules.Base}${FixedRoutes.BusinessReview}`, data);
  }

  getBusinessReviewForUser(id?: any) {
    return this.http.get(`${Modules.Base}${FixedRoutes.BusinessReview}/user/${id}`);
  }

  getBusinessReviewForBusiness(id?: any) {
    return this.http.get(`${Modules.Base}${FixedRoutes.BusinessReview}/business/${id}`);
  }

}
