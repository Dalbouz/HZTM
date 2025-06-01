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
import { HttpErrorResponse } from '@angular/common/http';
import { ListsServices } from '../services/Lists.Services';

@Component({
  selector: 'app-listsTab',
  standalone: true,
  imports: [RouterOutlet,
    CommonModule,
    FormsModule],
  templateUrl: './listsTab.component.html',
  styleUrls: ['./listsTab.component.css']
})
export class ListsTabTabComponent implements OnInit, OnDestroy{
    title = 'hztm_pacient_management';

    public filterActiveStatus: boolean = false;
    private activeFilter: FiltersEnum | undefined;
    public dateStart:string = '';
    public dateEnd:string = '';

    public showPositivePatientByDateTabe : boolean = false;

    public patientDatasTemp: PatientData[] = [];

    filters = [
        { label: FiltersEnum.dateRange, key: 'dateRange', active: false, value: '' },
        
        // Add more filters as needed
    ]

    constructor(
        public mainDataService: MainDataService,
        private router: Router,
        public genericMethodService: GenericServices,
        public listService: ListsServices
    ){}

    ngOnDestroy(): void {
    }

    public ngOnInit(): void {
    }

    goBack() {
    this.router.navigate([`/home`]);
    this.patientDatasTemp = [];
    this.disableAllFilters();
  }

  // public getFilteredAnalizatorDataBySampleNumber(patient: PatientData): AnalizatorData[] {
  //   if (!patient.analizatorDatas) return [];
  
  //   console.log('Selected sample number:', patient.selectedSampleNumber);
  //   console.log('All analizator datas:', patient.analizatorDatas);
    
  //   return patient.analizatorDatas.filter(a => {
  //     const match = String(a.sampleNumber).trim() === String(patient.selectedSampleNumber).trim();
  //     console.log(`SampleNumber: ${a.sampleNumber} | Match: ${match}`);
  //     return match;
  //   });
  // }

  public toggleFilter(selectedFilter: any) {
    if(this.filterActiveStatus == false){
        selectedFilter.active = true;
        this.activeFilter = selectedFilter.label;
        this.filterActiveStatus = true;
      }
      else{
        if(selectedFilter.label == this.activeFilter){
          selectedFilter.active = false;
          this.filterActiveStatus = false;
          this.activeFilter = undefined;
        }
        else{
          this.filters.forEach(filter => {
            filter.active = false;
          });
          selectedFilter.active = true;
          this.activeFilter = selectedFilter.label;
          this.filterActiveStatus = true;
        }
      }
  }

    public onSearch():void
  {
    if(this.filterActiveStatus == false){
      return;
    }

    const isSure = window.confirm('Jeste li siguni da želite započeti pretragu?\n(ova pretraga može trajati neko vrijeme)');
      if (isSure) {
        switch (this.activeFilter) {
          case FiltersEnum.dateRange:
            this.dateEnd = this.formatDateToDDMMYYYY(this.dateEnd);
            this.dateStart = this.formatDateToDDMMYYYY(this.dateStart);
            this.getByDate();
            break;
          case FiltersEnum.controlSampleLot:
            break;
            case FiltersEnum.controlSampleTestName:
            break;
          // ... more cases ...
          default:
    // code block if no case matches
      }
    }
  }

  private formatDateToDDMMYYYY(dateString: string): string {
  if (!dateString) return '';
  const [year, month, day] = dateString.split('-');
  return `${day}.${month}.${year}`;
}

  public disableAllFilters() {
      this.genericMethodService.disableAllFilters(this.filters);
      this.activeFilter = undefined;
      this.filterActiveStatus = false;
      this.patientDatasTemp = [];
  }

  public onRefresh(){
    this.disableAllFilters();
  }

//#region CallersToBackend
    private getByDate():PatientData[]{
          this.listService.getAllPositivePatientsByDateRange(this.dateStart,this.dateEnd).subscribe(
            (response: PatientData[]) => {
              if (response != null) {
                this.patientDatasTemp = response;
                if(this.patientDatasTemp == null || this.patientDatasTemp.length == 0){
                  alert("Nema pacijenata sa pozitivnim rezultatom")
                }
                else{
                  this.showPositivePatientByDateTabe = true;
                }
                return response;
              }
              else {
                alert("Nismo mogli naći pozitivne pacijente prema zadatnim datumima"); // Handle existing user
                return null;
              }
            },
            (error: HttpErrorResponse) => {
              alert(`Error: ${error.error.message || error.message}`);
            }
            
          );
          return [];
        }

        //#endregion
}
