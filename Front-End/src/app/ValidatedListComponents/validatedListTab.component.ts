import { CommonModule, CurrencyPipe } from '@angular/common';
import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';
import { MainDataService } from '../services/MainData.Services';
import { GenericServices } from '../services/GenericMethods.Service';
import { FiltersEnum } from '../dataStructure/FiltersEnum';
import { AnalizatorData } from '../dataStructure/AnalizatorData';
import { ValidationStatus } from '../dataStructure/ValidationStatus';
import { AnalizatorServices } from '../services/Analizator.Services';
import { HttpErrorResponse } from '@angular/common/http';
import { SecurityLevel } from '../dataStructure/SecurityLevel';
import { TestStatusEnum } from '../dataStructure/TestStatusEnum';
import { AssayaData } from '../dataStructure/AssayaData';

@Component({
  selector: 'app-validatedListTab',
  standalone: true,
  imports: [RouterOutlet,
    CommonModule,
    FormsModule],
  templateUrl: './validatedListTab.component.html',
  styleUrls: ['./validatedListTab.component.css']
})



export class ValidatedListTabComponent implements OnInit, OnDestroy{
    title = 'hztm_pacient_management';

    public filteredValidatedTests: AnalizatorData[] = [];
    public filteredListTemp: AnalizatorData[] = [];
    public filteringDate:string ='';
    public showTable:boolean = false;
    public filterActiveStatus: boolean = false;
    private activeFilter: FiltersEnum | undefined;
    public selectedAssayaName: string = '';

    public assayaNameList: String[] = [];

    public showFromIndex:number = 0;
    private numberOfShownTests: number = 20;

    private listOfActiveFilters: FiltersEnum[] = [];

    constructor(
        public mainDataService: MainDataService,
        private router: Router,
        public genericMethods: GenericServices,
        public analizatorService: AnalizatorServices
    ){}

     filters = [
        { label: FiltersEnum.AssayName, key: 'AssayName', active: true, value: this.selectedAssayaName},
        { label: FiltersEnum.dateOfReading, key: 'dateOfReading', active: false, value: '' },
        { label: FiltersEnum.dateOfValidation, key: 'dateOfValidation', active: false, value: '' },
        { label: FiltersEnum.sampleNumber, key: 'sampleNumber', active: false, value: '' },
        
        
        // Add more filters as needed
      ];

      ngOnInit(): void {
        this.filteredValidatedTests = this.mainDataService.validatedAnalizators;

        this.showFromIndex = 0;
        this.showList(0);

        this.mainDataService.assayaDataList.forEach(element => {
          this.assayaNameList.push(element.assayaName);
        });

        this.filters[0].active = true;
        // this.getValidatedTests();
      }

      ngOnDestroy(): void {
        this.filteredValidatedTests = this.mainDataService.validatedAnalizators;

        this.showFromIndex = 0;
        this.showList(0);
      }

      public showList(value:number){
        this.filteredListTemp = [];
        if(value == 0){
          this.showFromIndex -= this.numberOfShownTests;
          if(this.showFromIndex < 0){
            this.showFromIndex = 0;
          }
        }
        else if(value == 1){
          this.showFromIndex += this.numberOfShownTests;
          if(this.showFromIndex > this.filteredValidatedTests.length){
            this.showFromIndex = this.filteredValidatedTests.length;
          }
        }

        for(let i = this.showFromIndex; i < this.numberOfShownTests + this.showFromIndex && i < this.filteredValidatedTests.length; i++){
          this.filteredListTemp.push(this.filteredValidatedTests[i]);
      }
    }

    public goBack():void {
      this.router.navigate([`/analizatorTestsTab`]);
      this.disableAllFilters();

      this.filteredValidatedTests = this.mainDataService.validatedAnalizators;

      this.showFromIndex = 0;
      this.showList(0);
    }

    public toggleFilter(selectedFilter: any):void {
      this.genericMethods.toggleFilter(selectedFilter);

      if(selectedFilter.active == true)
        this.listOfActiveFilters.push(selectedFilter.label);
      else{
        if(this.listOfActiveFilters.length != 0){
            const newArr = this.listOfActiveFilters.filter(obj=> obj !== selectedFilter.label);
            this.listOfActiveFilters = newArr;
        }
      }
    }

  public onSearch():void
  {
    const isSure = window.confirm('Jeste li siguni da želite započeti pretragu?\n(ova pretraga može trajati neko vrijeme)');
      if (isSure) {
        this.listOfActiveFilters.forEach(filter=>{
          if(filter == FiltersEnum.dateOfReading || filter == FiltersEnum.dateOfValidation){
            this.filters.forEach(filter2=>{
              if(filter2.label == FiltersEnum.dateOfReading || filter2.label == FiltersEnum.dateOfValidation)
              filter2.value = this.genericMethods.formatDateToYYYYMMDD(filter2.value);
            })
          }
        })

        this.filters[0].active = true;
        this.filters[0].value = this.selectedAssayaName;
        this.filterAnalizators();
        // this.filteredListTemp = [];
        // this.filteredListTemp = this.genericMethods.getFilteredArrayOnSearch(this.filters,this.filteredValidatedTests);
        this.showTable = true;
    }
  }

  public disableAllFilters() {
     this.genericMethods.disableAllFilters(this.filters);
  }

  public onRefresh(){
    this.disableAllFilters();

    this.filters[0].active = true;
    this.filters[0].value = this.selectedAssayaName;

    this.onSearch();
  }

  public archiveAnalizator(analizator: AnalizatorData):void {
      if (analizator.validated == ValidationStatus.Validated && this.mainDataService.currentUser.securityLevelStatus == SecurityLevel.High) {
        const isSure = window.confirm('Želite li arhivirati test za uzorak:' + " " + analizator.sampleNumber + " " + "za pacijenta:" + " " + analizator.specimenID +"?");
        if (isSure) {
          analizator.testStatus = TestStatusEnum.Archived;
          this.mainDataService.archivedAnalizators.push(analizator);
          this.mainDataService.validatedAnalizators.filter(obj=> obj !== analizator);
          this.updateAnalizatorData(analizator, analizator.id);
        }
      }
    }
  
//#region PrivateMethods
  private filterAnalizators():void{
        this.analizatorService.filterAnalizatorsByGivenList(this.filters, this.mainDataService.validatedAnalizators).subscribe(
          (response: AnalizatorData[]) => {
            if (response != null) {
              this.filteredValidatedTests = response;
  
              this.showFromIndex = 0;
              this.showList(0);
               return response;
            }
            else {
              alert("Error wont add Analizator Test"); // Handle existing user
              return null;
            }
          },
          (error: HttpErrorResponse) => {
            alert(`Error: ${error.error.message || error.message}`);
          }
        );
      }

       private updateAnalizatorData(analizator: AnalizatorData, id:number = -1):void{
      this.analizatorService.updateAnalizator(analizator, id).subscribe(
        (response: AnalizatorData) => {
          if (response != null) {
            this.mainDataService.activeAnalizators = this.genericMethods.replaceObjectById(this.mainDataService.activeAnalizators, response);
          }
          else {
            alert("Error wont update Analizator Test"); // Handle existing user
          }
        },
        (error: HttpErrorResponse) => {
          alert(`Error: ${error.error.message || error.message}`);
        }
      );
    }
}
