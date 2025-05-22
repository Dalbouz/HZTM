import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';
import { MainDataService } from '../services/MainData.Services';
import { PatientData } from '../dataStructure/PatientData';
import { AnalizatorData } from '../dataStructure/AnalizatorData';

@Component({
  selector: 'app-patientsTab',
  standalone: true,
  imports: [RouterOutlet,
    CommonModule,
    FormsModule],
  templateUrl: './patientsTab.component.html',
  styleUrls: ['./patientsTab.component.css']
})
export class PatientsTabComponent {
    title = 'hztm_pacient_management';

    public selectedSampleNumber:string | undefined;

    constructor(
        public mainDataService: MainDataService,
        private router: Router,
    ){}

    goBack() {
    this.router.navigate([`/home`]);
  }

  public getFilteredAnalizatorDataBySampleNumber(patient: PatientData): AnalizatorData[] {
    if (!patient.analizatorDatas) return [];
      return patient.analizatorDatas.filter(
        a => a.sampleNumber === patient.selectedSampleNumber
    );
  }
}
