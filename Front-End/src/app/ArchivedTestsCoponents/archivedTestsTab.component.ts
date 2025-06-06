import { CommonModule, CurrencyPipe } from '@angular/common';
import { AfterViewInit, Component, ElementRef, OnChanges, OnDestroy, OnInit, QueryList, SimpleChanges, ViewChild, ViewChildren } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';
import { MainDataService } from '../services/MainData.Services';
import { AnalizatorData } from '../dataStructure/AnalizatorData';
import { SecurityLevel } from '../dataStructure/SecurityLevel';
import { AnalizatorServices } from '../services/Analizator.Services';
import { TestStatusEnum } from '../dataStructure/TestStatusEnum';
import { FiltersEnum } from '../dataStructure/FiltersEnum';
import { GenericServices } from '../services/GenericMethods.Service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-archivedTestsTab',
  standalone: true,
  imports: [RouterOutlet,
    CommonModule,
    FormsModule],
  templateUrl: './archivedTestsTab.component.html',
  styleUrls: ['./archivedTestsTab.component.css']
})
export class ArchivedTestsTabComponent implements OnInit, AfterViewInit, OnDestroy{
    title = 'hztm_pacient_management';

    public editTests: boolean = false;
    public isFilteredByDateRange: boolean = false;
    public dateStart:string = '';
    public dateEnd:string = '';
  
    private currentEditedAnalizator?: AnalizatorData | undefined;
    private tempAnalizatorData?:AnalizatorData | undefined;
    private dataListTemp: AnalizatorData[] = [];

    public showFromIndex:number = 0;
    private numberOfShownTests: number = 20;
    private fullAnalizazorDataList: AnalizatorData[] = []

    // public isStatisticFilterNumbOfPatients: boolean = false;
    // public isStatisticFilterNumbOfSamples: boolean = false;
    // public isStatisticFilterNumbOfTests: boolean = false;


    filteredAnalizatorTests: AnalizatorData[] = [];
    
    @ViewChildren('TextareaNotes') textareaNoteRefs!: QueryList<ElementRef<HTMLTextAreaElement>>;
    @ViewChildren('TextareaFinalResult') textareaFinalResultRefs!: QueryList<ElementRef<HTMLTextAreaElement>>;
//#region filters
    filters = [
    { label: FiltersEnum.analizatorName, key: 'analizatorName', active: false, value: '' },
    { label: FiltersEnum.AssayName, key: 'assayTest', active: false, value: '' },
    { label: FiltersEnum.dateOfReading, key: 'dateOfReading', active: false, value: '' },
    // { label: FiltersEnum.timeOfReading, key: 'timeOfReading', active: false, value: '' },
    { label: FiltersEnum.sampleNumber, key: 'sampleNumber', active: false, value: '' },
    { label: FiltersEnum.specimenID, key: 'specimenID', active: false, value: '' },
    { label: FiltersEnum.positiveResults, key: 'positiveResults', active: false, value: '' },
    { label: FiltersEnum.analizatorMark, key: 'testMark', active: false, value: '' },
    { label: FiltersEnum.lot, key: 'lot', active: false, value: '' },
    { label: FiltersEnum.expirationDateReagens, key: 'expirationDateReagens', active: false, value: '' },
    { label: FiltersEnum.dateRange, key: 'dateRange', active: false, value: '' },
    
    // Add more filters as needed
  ];

  constructor(
      public mainDataService: MainDataService,
      private router: Router,
      private analizatorService:AnalizatorServices,
      public genericMethods: GenericServices
  ){}

// statisticFilterNumberPatients = [
//     { label: FiltersEnum.assayName, key: 'assayTest', active: false, value: '' },
//     { label: FiltersEnum.priority, key: 'priority', active: false, value: '' },
//     { label: FiltersEnum.priorityReason, key: 'priorityReason', active: false, value: '' },
//     { label: FiltersEnum.testResult, key: 'testResult', active: false, value: '' },
    
//     // Add more filters as needed
//   ];

//#endregion
  ngOnDestroy(): void {
    this.clearEditedTestIfNotConfirmed();
    this.fullAnalizazorDataList = this.mainDataService.activeAnalizators;

    this.showFromIndex = 0;
    this.showList(0);
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
        // Combine both sets of textarea references
        const allTextareas = [
          ...this.textareaNoteRefs.toArray(),
          ...this.textareaFinalResultRefs.toArray()
        ];

        // Auto-resize all textareas
        allTextareas.forEach(ref => {
          this.autoResize({ target: ref.nativeElement } as unknown as Event);
        });
      });
    this.clearEditedTestIfNotConfirmed();
  }

   ngOnInit():void{
    this.clearEditedTestIfNotConfirmed();
    
    this.fullAnalizazorDataList = this.mainDataService.archivedAnalizators;
    this.showFromIndex = 0;
    this.showList(0);
  }

public showList(value:number){
    this.filteredAnalizatorTests = [];
    if(value == 0){
      this.showFromIndex -= this.numberOfShownTests;
      if(this.showFromIndex < 0){
        this.showFromIndex = 0;
      }
    }
    else if(value == 1){
      this.showFromIndex += this.numberOfShownTests;
      if(this.showFromIndex > this.fullAnalizazorDataList.length){
        this.showFromIndex = this.fullAnalizazorDataList.length;
      }
    }

    for(let i = this.showFromIndex; i < this.numberOfShownTests + this.showFromIndex && i < this.fullAnalizazorDataList.length; i++){
      this.filteredAnalizatorTests.push(this.fullAnalizazorDataList[i]);
    }
  }

  public goBack():void {
    this.router.navigate([`/analizatorTestsTab`]);
    this.disableAllFilters();
    this.clearEditedTestIfNotConfirmed();
    
    this.fullAnalizazorDataList = this.mainDataService.archivedAnalizators;
    this.showFromIndex = 0;
    this.showList(0);
  }

  public onRefresh(){
    this.disableAllFilters();
    this.clearEditedTestIfNotConfirmed();
    
    this.fullAnalizazorDataList = this.mainDataService.archivedAnalizators;
    this.showFromIndex = 0;
    this.showList(0);
  }

  public toggleFilter(filter: any) {
    if(filter.key == 'dateRange' && filter.active == false ){
      this.isFilteredByDateRange = true;
    }
    else if(filter.key == 'dateRange' && filter.active == true){
      this.isFilteredByDateRange = false;
    }
    this.genericMethods.toggleFilter(filter);
  }

  public autoResize(event: Event): void {
    const textarea = event.target as HTMLTextAreaElement;
    textarea.style.height = 'auto'; // Reset height
    textarea.style.height = textarea.scrollHeight + 'px'; // Set to scrollHeight
  }

  public onSearch():void
  {
    if(this.isFilteredByDateRange){
      this.dateEnd = this.genericMethods.formatDateToYYYYMMDD(this.dateEnd);
      this.dateStart = this.genericMethods.formatDateToYYYYMMDD(this.dateStart);
      this.getByDate();
    }
    else{
      this.filterAnalizators();
      // this.filteredAnalizatorTests = this.genericMethods.getFilteredArrayOnSearch(this.filters, this.mainDataService.archivedAnalizators);
    }
  }

  public disableAllFilters() {
      this.genericMethods.disableAllFilters(this.filters);
  }

  //#region PrivateMethods
  private clearEditedTestIfNotConfirmed(){
    this.editTests = false;
    if(this.currentEditedAnalizator){
      this.currentEditedAnalizator.isEdited = false;
      this.currentEditedAnalizator = undefined;
    }
    if(this.tempAnalizatorData){
      this.tempAnalizatorData = undefined;
    }
  }
  //#endregion

  //#region ActionButttons
  public confirmDelete(analizator: AnalizatorData):void {
    if(this.mainDataService.currentUser.securityLevelStatus != SecurityLevel.High){
      return;
    }

      const userName = prompt('Enter username:');
      if(userName == this.mainDataService.currentUser.userName){
        const password = prompt('Enter password:');
        if(password == this.mainDataService.currentUser.password ){
          const userNameAdmin = prompt('Enter admin username:');
          if(userNameAdmin == this.mainDataService.adminUserName){
            const passwordAdmin = prompt('Enter admin password:');
            if(this.mainDataService.adminPassword == passwordAdmin){

              analizator.testStatus = TestStatusEnum.Deleted;
              if(analizator.id != undefined)
                this.analizatorService.updateAnalizator(analizator, analizator.id);
            }
            else{
              alert("Admin password je netočan!");
            }
          }
          else{
            alert("Admin username je netočan!");
          }
        }
        else{
          alert("Password je netočan!");
        }
      }
      else{
        alert("Username je netočan!");
      }
    }

    public editAnalizator(analizator: AnalizatorData):void {
      if(this.mainDataService.currentUser.securityLevelStatus != SecurityLevel.High){
        return;
      }

      if(this.editTests){
        return;
      }

      analizator.isEdited = true;
      this.editTests = true;

      this.currentEditedAnalizator = analizator;

      this.tempAnalizatorData = {
        ...analizator
      }

      this.dataListTemp = [...this.mainDataService.archivedAnalizators];
    }

    public confirmUpdate(test: AnalizatorData) {
    // Validate required fields
    if (!test.analizatorName || !test.testMark || !test.lot || 
      !test.expirationDateReagens || !test.interpretedResult || !test.numericValueFromAnalizator || 
      !test.interpretationForEDelphyn || !test.testMarkForEDelphyn || !test.assayName) {
      alert('Please fill all required fields');
      return;
    }
    this.updateAnalizatorData(test, test.id);
    this.editTests = false;
    if(this.currentEditedAnalizator){
      this.currentEditedAnalizator.isEdited = false;
      this.currentEditedAnalizator = undefined;
    }
  }

  public cancelUpdate(analizator: AnalizatorData){
    if (this.tempAnalizatorData != null) {
    Object.assign(analizator, this.tempAnalizatorData);
    }
    this.clearEditedTestIfNotConfirmed();
  }
  //#endregion

//#region CallersToBackend
    private updateAnalizatorData(analizator: AnalizatorData, id:number = -1):void{
      this.analizatorService.updateAnalizator(analizator, id).subscribe(
        (response: AnalizatorData) => {
          if (response != null) {
            console.log("analizator found when updated");
            this.mainDataService.archivedAnalizators = this.genericMethods.replaceObjectById(this.mainDataService.activeAnalizators, response);
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

    private getByDate():void{
      this.analizatorService.getArchivedAnalizatorsDataByDateRange(this.dateStart, this.dateEnd).subscribe(
        (response: AnalizatorData[])=>{
          if(response != null){
            this.filterAnalizators();
              // this.filteredAnalizatorTests = this.genericMethods.getFilteredArrayOnSearch(this.filters, response);
          }
        else {
            alert("Error cant find archived tests by date"); // Handle existing user
          }
        },
        (error: HttpErrorResponse) => {
          alert(`Error: ${error.error.message || error.message}`);
        }
      );
    }

    private filterAnalizators():void{
      this.analizatorService.filterAnalizatorsByGivenList(this.filters, this.mainDataService.archivedAnalizators).subscribe(
        (response: AnalizatorData[]) => {
          if (response != null) {
            this.fullAnalizazorDataList = response;

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
  //#endregion
}
