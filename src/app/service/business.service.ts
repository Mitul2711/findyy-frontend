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
    return this.http.post(`${Modules.Base}${FixedRoutes.BusinessRegister.Business}/location`, data);
  }

  getBusinessData() {
    return this.http.get(`${Modules.Base}${FixedRoutes.BusinessRegister.Business}`);
  }

  updateBusiness(data: any) {
    return this.http.post(`${Modules.Base}${FixedRoutes.BusinessRegister.Business}/${data.id}`, data);
  }

}
