import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(public toastr: ToastrService) { }

  showSuccess(msg: string,) {
    this.toastr.success(msg, '', {
      timeOut: 1500,
    });
  }
  showError(msg: string,) {
    this.toastr.error(msg, '', {
      timeOut: 1500,
    });
  }
  showInfo(msg: string,) {
    this.toastr.info(msg, '', {
      timeOut: 1500,
    });
  }
  showWarning(msg: string,) {
    this.toastr.warning(msg, '', {
      timeOut: 1500,
    });
  }

}
