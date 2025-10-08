import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { CommonModule } from '@angular/common';
import { UserHomeComponent } from '../user/user-home/user-home.component';
import { BusinessHomeComponent } from '../business/business-home/business-home.component';

@Component({
  selector: 'app-home',
  imports: [RouterModule, CommonModule, UserHomeComponent, BusinessHomeComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  constructor(public authService: AuthService) {}

}
