import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';
import { MainDataService } from '../services/MainData.Services';
import { PatientData } from '../dataStructure/PatientData';
import { AnalizatorData } from '../dataStructure/AnalizatorData';
import { FiltersEnum } from '../dataStructure/FiltersEnum';
import { GenericServices } from '../services/GenericMethods.Service';

@Component({
  selector: 'app-patientsTab',
  standalone: true,
  imports: [RouterOutlet,
    CommonModule,
    FormsModule],
  templateUrl: './patientsTab.component.html',
  styleUrls: ['./patientsTab.component.css']
})
export class PatientsTabComponent implements OnInit, OnDestroy{
    title = 'hztm_pacient_management';

    public selectedSampleNumber:string | undefined;

    public patientDatasTemp: PatientData[] = [];

    filters = [
        { label: FiltersEnum.specimentID, key: 'specimentID', active: false, value: '' },
        { label: FiltersEnum.oib, key: 'oib', active: false, value: '' }
        
        // Add more filters as needed
    ]

    constructor(
        public mainDataService: MainDataService,
        private router: Router,
        public genericMethodService: GenericServices
    ){}

    ngOnDestroy(): void {
      this.patientDatasTemp = this.mainDataService.patients;
    }

    public ngOnInit(): void {
      this.patientDatasTemp = this.mainDataService.patients;
    }

    goBack() {
    this.router.navigate([`/home`]);
    this.patientDatasTemp = this.mainDataService.patients;
  }

  public getFilteredAnalizatorDataBySampleNumber(patient: PatientData): AnalizatorData[] {
    if (!patient.analizatorDatas) return [];
    
    return patient.analizatorDatas.filter(a => {
      const match = String(a.sampleNumber).trim() === String(patient.selectedSampleNumber).trim();
      console.log(`SampleNumber: ${a.sampleNumber} | Match: ${match}`);
      return match;
    });
  }

     public toggleFilter(filter: any) {
    this.genericMethodService.toggleFilter(filter);
  }

    public onSearch():void
  {
    this.patientDatasTemp = this.genericMethodService.getFilteredArrayOnSearch(this.filters, this.mainDataService.patients)
  }

  public disableAllFilters() {
      this.genericMethodService.disableAllFilters(this.filters);
  }

  public onRefresh(){
    this.disableAllFilters();
    this.patientDatasTemp = this.mainDataService.patients;
  }
}
