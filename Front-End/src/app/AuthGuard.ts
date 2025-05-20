import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { MainDataService } from './services/MainData.Services'; // or your auth service

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private mainDataService: MainDataService, private router: Router) {}

  canActivate(): boolean {
    if (this.mainDataService.isLoggedIn) { // Replace with your actual login check
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
