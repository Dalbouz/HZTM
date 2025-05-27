import { CommonModule, CurrencyPipe } from '@angular/common';
import { AfterViewInit, Component, ElementRef, OnChanges, OnDestroy, OnInit, QueryList, SimpleChanges, ViewChild, ViewChildren } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';
import { MainDataService } from '../services/MainData.Services';
import { AnalizatorData } from '../dataStructure/AnalizatorData';
import { SecurityLevel } from '../dataStructure/SecurityLevel';
import { AnalizatorServices } from '../services/Analizator.Services';
import { ValidationStatus } from '../dataStructure/ValidationStatus';
import { TestStatusEnum } from '../dataStructure/TestStatusEnum';
import { FiltersEnum } from '../dataStructure/FiltersEnum';
import { GenericServices } from '../services/GenericMethods.Service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-analizatorTestsTab',
  standalone: true,
  imports: [RouterOutlet,
    CommonModule,
    FormsModule],
  templateUrl: './analizatorTestsTab.component.html',
  styleUrls: ['./analizatorTestsTab.component.css']
})
export class AnalizatorTestsTabComponent implements OnInit, AfterViewInit, OnDestroy{
    title = 'hztm_pacient_management';

    public newTestTemplate: AnalizatorData | undefined;
    public addingIndex: number = -1;

    filteredAnalizatorTests: AnalizatorData[] = [];
    @ViewChildren('TextareaNotes') textareaRefs!: QueryList<ElementRef<HTMLTextAreaElement>>;
    filters = [
    { label: FiltersEnum.analizatorName, key: 'analizatorName', active: false, value: '' },
    { label: FiltersEnum.assayName, key: 'assayTest', active: false, value: '' },
    { label: FiltersEnum.dateOfReading, key: 'dateOfReading', active: false, value: '' },
    { label: FiltersEnum.timeOfReading, key: 'timeOfReading', active: false, value: '' },
    { label: FiltersEnum.sampleNumber, key: 'sampleNumber', active: false, value: '' },
    
    // Add more filters as needed
  ];

  ngOnDestroy(): void {
    this.clearAddedTestIfNotConfirmed();
    this.filteredAnalizatorTests = this.mainDataService.analizatorDatas;
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.textareaRefs.forEach(ref => {
        this.autoResize({ target: ref.nativeElement } as any as Event);
      });
    });
    this.clearAddedTestIfNotConfirmed();
  }

   ngOnInit():void{
      this.filteredAnalizatorTests = this.mainDataService.analizatorDatas;
       this.clearAddedTestIfNotConfirmed();
  }

    constructor(
        public mainDataService: MainDataService,
        private router: Router,
        private analizatorService:AnalizatorServices,
        public genericMethods: GenericServices
    ){}

    public goBack():void {
      this.router.navigate([`/home`]);
      this.filteredAnalizatorTests = this.mainDataService.analizatorDatas;
      this.disableAllFilters();
       this.clearAddedTestIfNotConfirmed();
    }

    public toggleFilter(filter: any) {
    this.genericMethods.toggleFilter(filter);
  }

  public autoResize(event: Event): void {
    const textarea = event.target as HTMLTextAreaElement;
    textarea.style.height = 'auto'; // Reset height
    textarea.style.height = textarea.scrollHeight + 'px'; // Set to scrollHeight
  }

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

  public archiveAnalizator(analizator: AnalizatorData):void {
    if (analizator.validated == ValidationStatus.Validated && this.mainDataService.currentUser.securityLevelStatus == SecurityLevel.High) {
      const isSure = window.confirm('Želite li arhivirati test za uzorak:' + " " + analizator.sampleNumber + " " + "za pacijenta:" + " " + analizator.specimenID +"?");
      if (isSure) {
        analizator.testStatus = TestStatusEnum.Archived;
        const now = new Date();
        analizator.testWasValidatedBy = this.mainDataService.currentUser.fullName + " / " + now.toLocaleDateString() + " / " + now.toLocaleTimeString();
        this.mainDataService.analizatorDatas.push(this.addAnalizatorData(analizator));//kreiraj novi analizator sa novim podacima
      }
    }
  }

  public confirmValidate(analizator: AnalizatorData):void {
    if(this.mainDataService.currentUser.securityLevelStatus == SecurityLevel.Low){
        return;
      }
      
    const adminUser = prompt('Enter username:');
    if(this.mainDataService.currentUser.userName == adminUser){

      const adminPass = prompt('Enter password:');
      if(this.mainDataService.currentUser.password == adminPass){
        analizator.validated = ValidationStatus.Validated;
        if(analizator.id != undefined)
          this.updateAnalizatorData(analizator, analizator.id);
      }
      else{
        alert("Password je netočan!");
      }
    }
    else{
      alert("Username je netočan!");
    }
  }

  public onSearch():void
  {
    this.filteredAnalizatorTests = this.genericMethods.getFilteredArrayOnSearch(this.filters, this.mainDataService.analizatorDatas)
  }

  public disableAllFilters() {
      this.genericMethods.disableAllFilters(this.filters);
  }

  public onRefresh(){
    this.disableAllFilters();
    this.filteredAnalizatorTests = this.mainDataService.analizatorDatas;
    this.clearAddedTestIfNotConfirmed();
  }

  public addTest(baseTest: AnalizatorData){
     
  // Create a copy of the base test with default values
  const newTest: AnalizatorData = {
    ...baseTest,
    analizatorName: '', // You can override or set new values below
    testMark: '',
    interpretedResult: '',
    interpretationForEDelphyn: '',
    testMarkForEDelphyn: '',
    testWasValidatedBy: '',
    lot: '',
    expirationDateReagens: '',
    assayName: '',
    isNew: true,
    validated: ValidationStatus.NotValidated,
    testStatus: TestStatusEnum.Active,
    dateOfReading: new Date().toISOString().split('T')[0],
    timeOfReading: new Date().toLocaleTimeString(),
    notes: ''
  };

  // Find the index of the base test and insert below it
  const index = this.filteredAnalizatorTests.indexOf(baseTest);
  this.filteredAnalizatorTests.splice(index + 1, 0, newTest);
  this.addingIndex = index + 1;
  }

  public confirmAdd(test: AnalizatorData) {
    // Validate required fields
    // if (!test.testMark || !test.lot || !test.expirationDateReagens) {
    //   alert('Please fill all required fields');
    //   return;
    // }
    test.isNew = false;
    this.addingIndex = -1;
    delete test.id;
    const test1:AnalizatorData = this.addAnalizatorData(test);
    this.mainDataService.patients.forEach(patient =>{
      if(patient.specimentID == test1.specimenID){
        patient.analizatorDatas.push(test1);
        return;
      }
    })
  }

  public cancelAdd(test: AnalizatorData){
    this.clearAddedTestIfNotConfirmed();
  }

  private clearAddedTestIfNotConfirmed(){
    if(this.addingIndex > 0){
      this.filteredAnalizatorTests.splice(this.addingIndex, 1);
      this.addingIndex = -1;
    }
  }
//#region CallersToBackend
  private addAnalizatorData(analizator: AnalizatorData):AnalizatorData{
      this.analizatorService.addAnalizatorData(analizator).subscribe(
        (response: AnalizatorData) => {
          if (response != null) {
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
      return analizator;
    }

    private updateAnalizatorData(analizator: AnalizatorData, id:number):void{
      this.analizatorService.updateAnalizator(analizator, id).subscribe(
        (response: AnalizatorData) => {
          if (response != null) {
            this.mainDataService.analizatorDatas = this.genericMethods.replaceObjectById(this.mainDataService.analizatorDatas, response);
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
  //#endregion
}
