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
export class PatientsTabComponent implements OnInit{
    title = 'hztm_pacient_management';

    public selectedSampleNumber:string | undefined;

    public patientDatasTemp: PatientData[] = [];

    constructor(
        public mainDataService: MainDataService,
        private router: Router,
    ){}

    public ngOnInit(): void {
      this.patientDatasTemp = this.mainDataService.patients;
    }

    goBack() {
    this.router.navigate([`/home`]);
  }

  public getFilteredAnalizatorDataBySampleNumber(patient: PatientData): AnalizatorData[] {
    if (!patient.analizatorDatas) return [];
  
    console.log('Selected sample number:', patient.selectedSampleNumber);
    console.log('All analizator datas:', patient.analizatorDatas);
    
    return patient.analizatorDatas.filter(a => {
      const match = String(a.sampleNumber).trim() === String(patient.selectedSampleNumber).trim();
      console.log(`SampleNumber: ${a.sampleNumber} | Match: ${match}`);
      return match;
    });
  }
}
