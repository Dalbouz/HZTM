import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';
import { MainDataService } from '../services/MainData.Services';

@Component({
  selector: 'app-sifrarnik',
  standalone: true,
  imports: [RouterOutlet,
    CommonModule,
    FormsModule],
  templateUrl: './sifrarnik.component.html',
  styleUrls: ['./sifrarnik.component.css']
})
export class SifrarnikComponent {
    title = 'hztm_pacient_management';

    constructor(
        public mainDataService: MainDataService,
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
