import { Routes } from '@angular/router';
import { LoginComponent } from './LoginComponents/login.component';
import { HomeComponent } from './HomeComponents/home.component';
import { PatientsTabComponent } from './PatientsTab/patientsTab.component';
import { AuthGuard } from './AuthGuard';
import { AnalizatorTestsTabComponent } from './AnalizatorTestComponents/analizatorTestsTab.component';
import { ControlSamplesTabComponent } from './ControlSamplesComponents/controlSamplesTab.component';
import { ValidatedListTabComponent } from './ValidatedListComponents/validatedListTab.component';
import { DdkTabComponent } from './DdkTab/ddkTab.component';
import { ArchivedTestsTabComponent } from './ArchivedTestsCoponents/archivedTestsTab.component';
import { ListsTabTabComponent } from './ListsComponents/listsTab.component';


export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'patientsTab', component: PatientsTabComponent, canActivate: [AuthGuard]},
  { path: 'analizatorTestsTab', component: AnalizatorTestsTabComponent, canActivate: [AuthGuard]},
  { path: 'controlSamplesTab', component: ControlSamplesTabComponent, canActivate: [AuthGuard]},
  { path: 'validatedListTab', component: ValidatedListTabComponent, canActivate: [AuthGuard]},
  { path: 'ddkTab', component: DdkTabComponent, canActivate: [AuthGuard]},
  { path: 'archivedTestsTab', component: ArchivedTestsTabComponent, canActivate: [AuthGuard]},
  { path: 'listsTab', component: ListsTabTabComponent, canActivate: [AuthGuard]},
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];


