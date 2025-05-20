import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';
import { UserService } from '../services/User.Services';
import { MainDataService } from '../services/MainData.Services';
import { UserData } from '../dataStructure/UserData';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterOutlet,
    CommonModule,
    FormsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
    title = 'hztm_pacient_management';

    constructor(
        public mainDataService: MainDataService,
        private userService: UserService,
        private router: Router,
    ){}

    navigateTo(route: string) {
    this.router.navigate([`/${route}`]);
  }

  logout() {
  // Add your logout logic here (e.g., clear tokens, redirect to login)
  this.router.navigate(['/login']);
  this.mainDataService.isLoggedIn = false;
  this.mainDataService.clearCurrentUser();
}
}
