import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';
import { MainDataService } from '../services/MainData.Services';

@Component({
  selector: 'app-patientsTab',
  standalone: true,
  imports: [RouterOutlet,
    CommonModule,
    FormsModule],
  templateUrl: './patientsTab.component.html',
  styleUrls: ['./PatientsTab.component.css']
})
export class PatientsTabComponent {
    title = 'hztm_pacient_management';

    constructor(
        public mainDataService: MainDataService,
        private router: Router,
    ){}

    goBack() {
    this.router.navigate([`/home`]);
  }
}
