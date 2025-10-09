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

  updateBusiness(data: any) {
    return this.http.post(`${Modules.Base}${FixedRoutes.BusinessRegister.Business}/${data.id}`, data);
  }

  getBusinessLocationById(businessId: any) {
    return this.http.get(`${Modules.Base}${FixedRoutes.BusinessRegister.BusinessLocation}/${businessId}`);
  }

  getBusinessHoursById(businessId: any) {
    return this.http.get(`${Modules.Base}${FixedRoutes.BusinessRegister.BusinessHours}/${businessId}`);
  }

}
