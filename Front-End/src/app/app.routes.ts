import { Routes } from '@angular/router';
import { LoginComponent } from './LoginComponents/login.component';
import { HomeComponent } from './HomeComponents/home.component';
import { AuthGuard } from './AuthGuard';


export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];